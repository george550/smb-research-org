import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubmissionSchema, insertAnalyticsEventSchema, insertTestimonialSchema, insertUserSchema } from "@shared/schema";
import { authenticateUser, requireAuth } from "./auth";
import { z } from "zod";
import Airtable from "airtable";

export async function registerRoutes(app: Express): Promise<Server> {
  // Participant signup endpoint
  app.post("/api/participants", async (req, res) => {
    try {
      const formData = req.body;

      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'businessName', 'city', 'role', 'employeeCount', 'industry'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          return res.status(400).json({ error: `Missing required field: ${field}` });
        }
      }

      // Create participant in Airtable
      const participant = await storage.createParticipant(formData);

      res.status(201).json({
        message: "Application submitted successfully",
        participantId: participant.id
      });
    } catch (error) {
      console.error("Participant submission error:", error);
      res.status(500).json({ error: "Failed to submit application" });
    }
  });

  // Survey participants endpoint (for /survey page)
  app.post("/api/survey-participants", async (req, res) => {
    try {
      const formData = req.body;

      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'businessName', 'city', 'role', 'employeeCount', 'industry'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          return res.status(400).json({ error: `Missing required field: ${field}` });
        }
      }

      // Map frontend values to Airtable option values (which have leading spaces for some options)
      const marketingChannelMapping: Record<string, string> = {
        'Social media (Facebook, Instagram, LinkedIn, etc.)': ' Social media (Facebook, Instagram, LinkedIn, etc.)',
        'Google Ads or paid search': 'Google Ads or paid search',
        'Email marketing': 'Email marketing',
        'Website / SEO': ' Website / SEO',
        'Print ads, flyers, or local marketing': 'Print ads, flyers, or local marketing',
        'Word of mouth only': 'Word of mouth only',
        'None / not doing marketing': 'None / not doing marketing',
        'Other': ' Other'
      };

      const mappedMarketingChannels = (formData.marketingChannels || []).map(
        (channel: string) => marketingChannelMapping[channel] || channel
      );

      // Using Unicode U+2019 (right single quotation mark) for apostrophes to match Airtable
      const apostrophe = '\u2019';

      // Initialize Airtable for Survey Participants table
      const base = new Airtable({
        apiKey: process.env.AIRTABLE_API_KEY
      }).base(process.env.AIRTABLE_BASE_ID!);

      const fields: any = {
        'Name': formData.name,
        'E-mail address': formData.email,
        'Phone': formData.phone,
        'Small Business Name': formData.businessName,
        'Which city is your business located in': formData.city,
        [`What${apostrophe}s your role in the business?`]: formData.role,
        'How many people work at your business (including you)?': formData.employeeCount,
        'What industry does your business operate in?': formData.industry,
        'Which of these do you personally handle or oversee?': formData.responsibilities || [],
        'What tools or systems do you use to manage payments and cash flow?': formData.tools || [],
        'What marketing channels do you use for your business?': mappedMarketingChannels,
        'What tool do you use to manage your website?': formData.websiteTool || '',
        [`How often do you personally look at your business${apostrophe}s finances?`]: formData.financeFrequency,
        'Tell us about the last time cash felt tight or payments got delayed. What happened?': formData.cashFlowStory,
        'Would you be comfortable talking through your typical week managing payments (without sharing any private numbers)?': formData.comfortableDiscussing,
      };

      // Add referral source if provided
      if (formData.referralSource) {
        fields['Who referred you/how did you find out about the research?'] = formData.referralSource;
      }

      // Submit to Survey Participants table
      const record = await base('Survey Participants').create(fields);

      res.status(201).json({
        message: "Survey submitted successfully",
        participantId: record.id
      });
    } catch (error: any) {
      console.error("Survey submission error:", error);
      res.status(500).json({
        error: "Failed to submit survey",
        details: error.message
      });
    }
  });

  // Get active testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Analytics event tracking endpoint
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const validatedData = insertAnalyticsEventSchema.parse(req.body);
      
      const event = await storage.createAnalyticsEvent({
        ...validatedData,
        ipAddress: validatedData.ipAddress || req.ip || req.headers['x-forwarded-for'] as string,
      });

      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid event data", details: error.errors });
      }
      console.error("Analytics tracking error:", error);
      res.status(500).json({ error: "Failed to track event" });
    }
  });

  // Authentication endpoints
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }
      
      const user = await authenticateUser(username, password);
      
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      req.session.userId = user.id;
      req.session.username = user.username;
      
      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          username: user.username 
        } 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });
  
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });
  
  app.get("/api/auth/me", (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    res.json({
      id: req.session.userId,
      username: req.session.username,
    });
  });

  // Admin endpoints (protected with auth)
  app.get("/api/admin/submissions", requireAuth, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const submissions = await storage.getSubmissions(limit);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  app.get("/api/admin/analytics", requireAuth, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 1000;
      const events = await storage.getAnalyticsEvents(limit);
      res.json(events);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  app.get("/api/admin/testimonials", requireAuth, async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching all testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/admin/testimonials", requireAuth, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid testimonial data", details: error.errors });
      }
      console.error("Error creating testimonial:", error);
      res.status(500).json({ error: "Failed to create testimonial" });
    }
  });

  app.patch("/api/admin/testimonials/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const testimonial = await storage.updateTestimonial(id, req.body);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      console.error("Error updating testimonial:", error);
      res.status(500).json({ error: "Failed to update testimonial" });
    }
  });

  app.delete("/api/admin/testimonials/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTestimonial(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
