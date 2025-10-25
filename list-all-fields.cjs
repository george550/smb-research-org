const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

console.log('Attempting to create a test record to see which field fails...\n');

// Try to create a minimal record with just the "role" field
const testFields = {
  "Name": "Test",
  "E-mail address": "test@test.com",
  "Phone": "1234567890",
  "Small Business Name": "Test Business",
  "Which city is your business located in": "San Francisco",
  "What's your role in the business?": "Owner", // straight apostrophe
  "How many people work at your business (including you)?": "1-5",
  "What industry does your business operate in?": "Technology"
};

base('Participants').create(testFields, (err, record) => {
  if (err) {
    console.error('Error creating record:', err.message);
    console.log('\nTrying with smart apostrophe instead...\n');

    // Try with smart apostrophe
    const smartApostrophe = String.fromCharCode(8217);
    const testFields2 = {
      "Name": "Test",
      "E-mail address": "test@test.com",
      "Phone": "1234567890",
      "Small Business Name": "Test Business",
      "Which city is your business located in": "San Francisco",
      "How many people work at your business (including you)?": "1-5",
      "What industry does your business operate in?": "Technology"
    };
    testFields2[`What${smartApostrophe}s your role in the business?`] = "Owner";

    base('Participants').create(testFields2, (err2, record2) => {
      if (err2) {
        console.error('Error with smart apostrophe too:', err2.message);
      } else {
        console.log('SUCCESS with smart apostrophe! Record created:', record2.id);
        console.log('Airtable expects SMART apostrophe (Unicode 8217)');
        // Clean up - delete the test record
        base('Participants').destroy(record2.id);
      }
    });
  } else {
    console.log('SUCCESS with straight apostrophe! Record created:', record.id);
    console.log('Airtable expects STRAIGHT apostrophe (Unicode 39)');
    // Clean up - delete the test record
    base('Participants').destroy(record.id);
  }
});
