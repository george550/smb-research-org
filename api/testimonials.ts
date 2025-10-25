import type { VercelRequest, VercelResponse } from '@vercel/node';
import Airtable from 'airtable';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for environment variables
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      console.error('Missing environment variables');
      return res.status(500).json({ error: 'Failed to fetch testimonials' });
    }

    // Initialize Airtable
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_BASE_ID);

    // Get all participants with testimonials
    const records = await base('Participants')
      .select({
        filterByFormula: "NOT({'Tell us about the last time cash felt tight or payments got delayed. What happened?'} = '')",
        sort: [{ field: 'Name', direction: 'asc' }]
      })
      .all();

    const testimonials = records.map((record, index) => ({
      id: record.id,
      name: record.get('Name') as string || 'Anonymous',
      businessType: record.get('What industry does your business operate in?') as string || 'Business Owner',
      quote: record.get('Tell us about the last time cash felt tight or payments got delayed. What happened?') as string || '',
      isActive: 1,
      displayOrder: index,
      createdAt: record.createdTime
    }));

    return res.status(200).json(testimonials);
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    return res.status(200).json([]); // Return empty array instead of erroring
  }
}
