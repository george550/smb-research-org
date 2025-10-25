const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

console.log('Fetching first record to see all field names...\n');

base('Participants').select({
  maxRecords: 1
}).firstPage((err, records) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  if (records && records.length > 0) {
    const fields = records[0].fields;
    console.log('=== AIRTABLE FIELD NAMES ===\n');

    const fieldNames = Object.keys(fields).sort();
    fieldNames.forEach((fieldName, index) => {
      const value = fields[fieldName];
      const valueType = Array.isArray(value) ? 'array' : typeof value;
      console.log(`${index + 1}. "${fieldName}" (${valueType})`);
    });

    console.log('\n=== COPY-PASTE READY FORMAT ===\n');
    fieldNames.forEach(fieldName => {
      console.log(`fields["${fieldName}"] = formData.XXX;`);
    });
  } else {
    console.log('No records found. Table might be empty.');
    console.log('Let me try to get table structure a different way...');
  }
});
