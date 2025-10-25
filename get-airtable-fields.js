import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

console.log('Fetching Airtable field names...\n');

try {
  const records = await base('Participants').select({
    maxRecords: 1
  }).firstPage();

  if (records.length > 0) {
    const fieldNames = Object.keys(records[0].fields);
    console.log('Available fields in Airtable:\n');
    fieldNames.forEach((field, index) => {
      console.log(`${index + 1}. "${field}"`);
      // Show the character codes for ALL characters in the field name
      console.log(`   Chars: ${[...field].map(c => `${c}(${c.charCodeAt(0)})`).join(' ')}`);
    });
  } else {
    console.log('No records found in the table.');
  }
} catch (error) {
  console.error('Error:', error.message);
}
