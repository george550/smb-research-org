const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

async function checkFields() {
  try {
    console.log('=== CHECKING SURVEY PARTICIPANTS TABLE ===\n');

    // Get the first record to see what fields exist and their values
    const records = await base('Survey Participants').select({ maxRecords: 1 }).firstPage();

    if (records.length > 0) {
      const record = records[0];
      console.log('Record ID:', record.id);
      console.log('\nAll fields in this record:');
      const fields = record.fields;
      for (const [fieldName, value] of Object.entries(fields)) {
        console.log(`\n"${fieldName}":`);
        console.log('  Type:', typeof value);
        console.log('  Value:', Array.isArray(value) ? JSON.stringify(value) : value);
      }
    } else {
      console.log('No records found in Survey Participants table');
    }

    console.log('\n\n=== CHECKING PARTICIPANTS TABLE ===\n');

    const participantRecords = await base('Participants').select({ maxRecords: 1 }).firstPage();

    if (participantRecords.length > 0) {
      const record = participantRecords[0];
      console.log('Record ID:', record.id);
      console.log('\nAll fields in this record:');
      const fields = record.fields;
      for (const [fieldName, value] of Object.entries(fields)) {
        console.log(`\n"${fieldName}":`);
        console.log('  Type:', typeof value);
        console.log('  Value:', Array.isArray(value) ? JSON.stringify(value) : value);
      }
    } else {
      console.log('No records found in Participants table');
    }

  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

checkFields();
