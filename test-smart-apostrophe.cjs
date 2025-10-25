const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

console.log('Testing with smart apostrophe and valid values...\n');

const smartApostrophe = String.fromCharCode(8217);
const testFields = {
  "Name": "Test User",
  "E-mail address": "test@test.com",
  "Phone": "4155551234",
  "Small Business Name": "Test Business",
  "Which city is your business located in": "San Francisco"
};

// Add the field with smart apostrophe
testFields[`What${smartApostrophe}s your role in the business?`] = "Test role";
testFields["How many people work at your business (including you)?"] = "5";
testFields["What industry does your business operate in?"] = "Technology";

base('Participants').create(testFields, (err, record) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log('✓ SUCCESS! Record created:', record.id);
    console.log('✓ Airtable DOES expect SMART apostrophe (Unicode 8217)');
    // Clean up
    base('Participants').destroy(record.id, () => {
      console.log('✓ Test record cleaned up');
    });
  }
});
