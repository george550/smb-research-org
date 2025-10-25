const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

console.log('Checking apostrophe character codes in Airtable field names...\n');

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

    fieldNames.forEach(fieldName => {
      if (fieldName.includes("'") || fieldName.includes("'")) {
        console.log(`Field: "${fieldName}"`);
        console.log('Character codes:');
        for (let i = 0; i < fieldName.length; i++) {
          const char = fieldName[i];
          if (char === "'" || char === "'") {
            console.log(`  Position ${i}: "${char}" = Unicode ${fieldName.charCodeAt(i)}`);
          }
        }
        console.log('');
      }
    });
  }
});
