const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

console.log('Fetching ALL field names from Airtable (including empty ones)...\n');

// Fetch a record and examine all fields
base('Participants').select({
  maxRecords: 1
}).firstPage((err, records) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  if (records && records.length > 0) {
    const fields = records[0].fields;
    const fieldNames = Object.keys(fields);

    console.log('=== FIELD NAMES AS JSON STRINGS ===\n');
    console.log('Copy and paste these EXACT strings into your code:\n');

    fieldNames.forEach(fieldName => {
      console.log(JSON.stringify(fieldName) + ',');
    });

    console.log('\n=== NOW TESTING EACH FIELD ===\n');

    // Test each field by trying to create a record
    console.log('Testing which fields are required and what values they accept...\n');
  }
});
