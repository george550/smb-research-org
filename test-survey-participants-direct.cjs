const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

async function testSurveyParticipantsDirect() {
  try {
    const apostrophe = '\u2019';
    const fields = {
      'Name': 'Test Survey User',
      'E-mail address': 'testsurvey@example.com',
      'Phone': '4155551234',
      'Small Business Name': 'Test Survey Business',
      'Which city is your business located in': 'San Francisco',
      [`What${apostrophe}s your role in the business?`]: 'I own the business',
      'How many people work at your business (including you)?': '1–2',
      'What industry does your business operate in?': 'Retail (online or offline stores)',
      'Which of these do you personally handle or oversee?': ['Sending invoices or collecting customer payments'],
      'What tools or systems do you use to manage payments and cash flow?': ['QuickBooks / Xero'],
      // Marketing channels with LEADING SPACES to match Airtable
      'What marketing channels do you use for your business?': [' Social media (Facebook, Instagram, LinkedIn, etc.)'],
      'What tool do you use to manage your website?': 'Squarespace / Wix / WordPress',
      [`How often do you personally look at your business${apostrophe}s finances?`]: 'Daily',
      'Tell us about the last time cash felt tight or payments got delayed. What happened?': 'Last month, a major client paid 30 days late, which made it difficult to cover payroll...',
      'Would you be comfortable talking through your typical week managing payments (without sharing any private numbers)?': 'Yes',
      'Who referred you/how did you find out about the research?': 'Test'
    };

    console.log('Testing Airtable submission to Survey Participants table with fields:', Object.keys(fields));

    const record = await base('Survey Participants').create(fields);

    console.log('✅ SUCCESS! Record created in Survey Participants table:', record.id);
  } catch (error) {
    console.error('❌ FAILED! Airtable error:');
    console.error('Error type:', error.error);
    console.error('Error message:', error.message);
    console.error('Status code:', error.statusCode);
    console.error('\nFull error:', JSON.stringify(error, null, 2));
  }
}

testSurveyParticipantsDirect();
