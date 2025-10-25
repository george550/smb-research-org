import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

console.log('Creating test record in Airtable...\n');

// Create test data with only confirmed fields
const testData = {};
testData["Name"] = "Claude Test - API Check";
testData["E-mail address"] = "claude-test@example.com";
testData["Phone"] = "555-999-8888";
testData["Small Business Name"] = "Bay Area Coffee Co";

// Copy the apostrophe character from actual field name returned by Airtable
const roleField = "What" + String.fromCharCode(8217) + "s your role in the business?";
testData[roleField] = "I own the business";

testData["How many people work at your business (including you)?"] = "3–10";
testData["What industry does your business operate in?"] = "Food & Beverages (Restaurant, Coffee Shop, etc)";
testData["Which of these do you personally handle or oversee?"] = [
  "Sending invoices or collecting customer payments"
];
testData["What tools or systems do you use to manage payments and cash flow?"] = [
  "QuickBooks / Xero"
];

const financeField = "How often do you personally look at your business" + String.fromCharCode(8217) + "s finances?";
testData[financeField] = "Daily";

const comfortableField = "Would you be comfortable talking through your typical week managing payments (without sharing any private numbers)?";
testData[comfortableField] = "Yes";

try {
  const record = await base('Participants').create(testData);

  console.log('✅ SUCCESS! Test record created in Airtable\n');
  console.log('Record ID:', record.id);
  console.log('Name:', record.get('Name'));
  console.log('Business:', record.get('Small Business Name'));
  console.log('City:', record.get('Which city is your business located in'));
  console.log('Email:', record.get('E-mail address'));
  console.log('\n👉 Check your Airtable "Participants" table now!');

} catch (error) {
  console.log('❌ Error creating record');
  console.log('Error:', error.message);
  if (error.statusCode) {
    console.log('Status Code:', error.statusCode);
  }
  if (error.error) {
    console.log('Details:', error.error);
  }
}
