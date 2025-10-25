const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

console.log('Testing field values against Airtable...\n');

// Test with minimal valid data to see what Airtable accepts
const apostrophe = '\u2019';
const testData = {
  "Name": "Test User",
  "E-mail address": "test@test.com",
  "Phone": "4155551234",
  "Small Business Name": "Test Business",
  "Which city is your business located in": "San Francisco",
  [`What${apostrophe}s your role in the business?`]: "I own the business",
  "How many people work at your business (including you)?": "1–2",
  "What industry does your business operate in?": "Technology",
  "Which of these do you personally handle or oversee?": ["Sending invoices or collecting customer payments"],
  "What tools or systems do you use to manage payments and cash flow?": ["QuickBooks / Xero"],
  "What marketing channels do you use for your business?": ["Social media (Facebook, Instagram, LinkedIn, etc.)"],
  "What tool do you use to manage your website?": "Squarespace / Wix / WordPress",
  [`How often do you personally look at your business${apostrophe}s finances?`]: "Daily",
  "Tell us about the last time cash felt tight or payments got delayed. What happened?": "Test story",
  "Would you be comfortable talking through your typical week managing payments (without sharing any private numbers)?": "Yes"
};

base('Participants').create(testData, (err, record) => {
  if (err) {
    console.error('ERROR:', err.message);
    console.error('\nThis tells us which field values Airtable does NOT accept.');
  } else {
    console.log('✓ SUCCESS! Record created:', record.id);
    console.log('✓ All field values are accepted by Airtable');

    // Clean up - delete the test record
    base('Participants').destroy(record.id, (err) => {
      if (err) {
        console.log('Note: Could not delete test record');
      } else {
        console.log('✓ Test record cleaned up');
      }
    });
  }
});
