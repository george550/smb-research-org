import type { VercelRequest, VercelResponse } from '@vercel/node';
import Airtable from 'airtable';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for environment variables
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      console.error('Missing environment variables:', {
        hasApiKey: !!process.env.AIRTABLE_API_KEY,
        hasBaseId: !!process.env.AIRTABLE_BASE_ID
      });
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'Airtable credentials not configured'
      });
    }

    // Initialize Airtable
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_BASE_ID);

    const formData = req.body;

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'businessName', 'city', 'role', 'employeeCount', 'industry'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }

    // Using Unicode U+2019 (right single quotation mark) for apostrophes to match Airtable
    const apostrophe = '\u2019';
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
      'What marketing channels do you use for your business?': formData.marketingChannels || [],
      'What tool do you use to manage your website?': formData.websiteTool || '',
      [`How often do you personally look at your business${apostrophe}s finances?`]: formData.financeFrequency,
      'Tell us about the last time cash felt tight or payments got delayed. What happened?': formData.cashFlowStory,
      'Would you be comfortable talking through your typical week managing payments (without sharing any private numbers)?': formData.comfortableDiscussing,
    };

    // Add referral source if provided
    if (formData.referralSource) {
      fields['Who referred you/how did you find out about the research?'] = formData.referralSource;
    }

    const record = await base('Participants').create(fields);

    return res.status(201).json({
      message: "Application submitted successfully",
      participantId: record.id
    });
  } catch (error: any) {
    console.error("Participant submission error:", error);
    return res.status(500).json({
      error: "Failed to submit application",
      details: error.message
    });
  }
}
