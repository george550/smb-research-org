const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

console.log('Listing all tables in the Airtable base...\n');

// Try to access common table names
const tablesToCheck = [
  'Participants',
  'Survey Participants',
  'survey participants',
  'SurveyParticipants'
];

async function checkTables() {
  for (const tableName of tablesToCheck) {
    try {
      const records = await base(tableName).select({ maxRecords: 1 }).firstPage();
      console.log(`✅ Found table: "${tableName}"`);
    } catch (err) {
      console.log(`❌ Table not found: "${tableName}"`);
    }
  }
}

checkTables();
