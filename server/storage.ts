/*import { 
  type User, type InsertUser,
  type Submission, type InsertSubmission,
  type Testimonial, type InsertTestimonial,
  type AnalyticsEvent, type InsertAnalyticsEvent,
  users, submissions, testimonials, analyticsEvents
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Submission methods
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  getSubmissions(limit?: number): Promise<Submission[]>;
  getSubmissionByTypeformId(typeformResponseId: string): Promise<Submission | undefined>;
  
  // Testimonial methods
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  getAllTestimonials(): Promise<Testimonial[]>;
  updateTestimonial(id: string, data: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<void>;
  
  // Analytics methods
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsEvents(limit?: number): Promise<AnalyticsEvent[]>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Submission methods
  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const [submission] = await db.insert(submissions).values(insertSubmission).returning();
    return submission;
  }

  async getSubmissions(limit: number = 100): Promise<Submission[]> {
    return db.select().from(submissions).orderBy(desc(submissions.submittedAt)).limit(limit);
  }

  async getSubmissionByTypeformId(typeformResponseId: string): Promise<Submission | undefined> {
    const [submission] = await db.select().from(submissions)
      .where(eq(submissions.typeformResponseId, typeformResponseId))
      .limit(1);
    return submission;
  }

  // Testimonial methods
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials)
      .where(eq(testimonials.isActive, 1))
      .orderBy(desc(testimonials.displayOrder));
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async updateTestimonial(id: string, data: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db.update(testimonials)
      .set(data)
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Analytics methods
  async createAnalyticsEvent(insertEvent: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [event] = await db.insert(analyticsEvents).values(insertEvent).returning();
    return event;
  }

  async getAnalyticsEvents(limit: number = 1000): Promise<AnalyticsEvent[]> {
    return db.select().from(analyticsEvents).orderBy(desc(analyticsEvents.timestamp)).limit(limit);
  }
}

export const storage = new DbStorage();
*/

import Airtable from 'airtable';
import type { 
  type User, type InsertUser,
  type Submission, type InsertSubmission,
  type Testimonial, type InsertTestimonial,
  type AnalyticsEvent, type InsertAnalyticsEvent,
} from "@shared/schema";

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Submission methods
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  getSubmissions(limit?: number): Promise<Submission[]>;
  getSubmissionByTypeformId(typeformResponseId: string): Promise<Submission | undefined>;

  // Participant methods
  createParticipant(data: any): Promise<any>;

  // Testimonial methods
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  getAllTestimonials(): Promise<Testimonial[]>;
  updateTestimonial(id: string, data: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<void>;

  // Analytics methods
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsEvents(limit?: number): Promise<AnalyticsEvent[]>;
}

export class AirtableStorage implements IStorage {
  // User methods (simplified for now)
  async getUser(id: string): Promise<User | undefined> {
    return undefined; // Not implemented yet
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined; // Not implemented yet
  }

  async createUser(user: InsertUser): Promise<User> {
    throw new Error("Not implemented");
  }

  // Submission methods (simplified for now)
  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    throw new Error("Not implemented");
  }

  async getSubmissions(limit?: number): Promise<Submission[]> {
    return []; // Not implemented yet
  }

  async getSubmissionByTypeformId(typeformResponseId: string): Promise<Submission | undefined> {
    return undefined; // Not implemented yet
  }

  // Participant methods
  async createParticipant(data: any): Promise<any> {
    // Using Unicode U+2019 (right single quotation mark) for apostrophes to match Airtable
    const apostrophe = '\u2019';

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

    const mappedMarketingChannels = (data.marketingChannels || []).map(
      (channel: string) => marketingChannelMapping[channel] || channel
    );

    const fields: any = {
      'Name': data.name,
      'E-mail address': data.email,
      'Phone': data.phone,
      'Small Business Name': data.businessName,
      'Which city is your business located in': data.city,
      [`What${apostrophe}s your role in the business?`]: data.role,
      'How many people work at your business (including you)?': data.employeeCount,
      'What industry does your business operate in?': data.industry,
      'Which of these do you personally handle or oversee?': data.responsibilities || [],
      'What tools or systems do you use to manage payments and cash flow?': data.tools || [],
      [`How often do you personally look at your business${apostrophe}s finances?`]: data.financeFrequency,
      'Tell us about the last time cash felt tight or payments got delayed. What happened?': data.cashFlowStory,
      'Would you be comfortable talking through your typical week managing payments (without sharing any private numbers)?': data.comfortableDiscussing,
    };

    // Add optional fields only if they exist in the table and have values
    if (data.marketingChannels && data.marketingChannels.length > 0) {
      fields['What marketing channels do you use for your business?'] = mappedMarketingChannels;
    }

    if (data.websiteTool) {
      fields['What tool do you use to manage your website?'] = data.websiteTool;
    }

    // Add referral source if provided
    if (data.referralSource) {
      fields['Who referred you/how did you find out about the research?'] = data.referralSource;
    }

    // Add LinkedIn profile if provided
    if (data.linkedInProfile) {
      fields['LinkedIn profile'] = data.linkedInProfile;
    }

    const record = await base('Participants').create(fields);

    return {
      id: record.id,
      ...data
    };
  }

  // Testimonial methods - MAPPED TO YOUR ACTUAL AIRTABLE FIELDS
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const record = await base('Participants').create({
      'Name': testimonial.name,
      'What industry does your business operate in?': testimonial.businessType,
      'Tell us about the last time cash felt tight or payments got delayed. What happened?': testimonial.quote,
      'Small Business Name': testimonial.name, // Using name as business name for now
    });

    return {
      id: record.id,
      name: testimonial.name,
      businessType: testimonial.businessType,
      quote: testimonial.quote,
      isActive: 1, // Default to active
      displayOrder: 0, // Default order
      createdAt: new Date()
    };
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    try {
      // Get all participants and use their feedback as testimonials
      const records = await base('Participants')
        .select({
          filterByFormula: "NOT({'Tell us about the last time cash felt tight or payments got delayed. What happened?'} = '')",
          sort: [{ field: 'Name', direction: 'asc' }]
        })
        .all();

      return records.map((record, index) => ({
        id: record.id,
        name: record.get('Name') as string || 'Anonymous',
        businessType: record.get('What industry does your business operate in?') as string || 'Business Owner',
        quote: record.get('Tell us about the last time cash felt tight or payments got delayed. What happened?') as string || '',
        isActive: 1,
        displayOrder: index,
        createdAt: new Date(record.createdTime)
      }));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return []; // Return empty array instead of crashing
    }
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    try {
      const records = await base('Participants')
        .select({
          sort: [{ field: 'Name', direction: 'asc' }]
        })
        .all();

      return records.map((record, index) => ({
        id: record.id,
        name: record.get('Name') as string || 'Anonymous',
        businessType: record.get('What industry does your business operate in?') as string || 'Business Owner',
        quote: record.get('Tell us about the last time cash felt tight or payments got delayed. What happened?') as string || '',
        isActive: 1,
        displayOrder: index,
        createdAt: new Date(record.createdTime)
      }));
    } catch (error) {
      console.error('Error fetching all testimonials:', error);
      return []; // Return empty array instead of crashing
    }
  }

  async updateTestimonial(id: string, data: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const updateData: any = {};
    if (data.name) updateData['Name'] = data.name;
    if (data.businessType) updateData['What industry does your business operate in?'] = data.businessType;
    if (data.quote) updateData['Tell us about the last time cash felt tight or payments got delayed. What happened?'] = data.quote;

    const record = await base('Participants').update(id, updateData);
    
    return {
      id: record.id,
      name: record.get('Name') as string,
      businessType: record.get('What industry does your business operate in?') as string,
      quote: record.get('Tell us about the last time cash felt tight or payments got delayed. What happened?') as string,
      isActive: 1,
      displayOrder: 0,
      createdAt: new Date(record.createdTime)
    };
  }

  async deleteTestimonial(id: string): Promise<void> {
    await base('Participants').destroy(id);
  }

  // Analytics methods (simplified for now)
  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    throw new Error("Not implemented");
  }

  async getAnalyticsEvents(limit?: number): Promise<AnalyticsEvent[]> {
    return []; // Not implemented yet
  }
}

export const storage = new AirtableStorage();