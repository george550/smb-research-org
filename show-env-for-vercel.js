import dotenv from 'dotenv';

dotenv.config();

console.log('\n=== COPY THESE VALUES TO VERCEL ===\n');
console.log('Variable 1:');
console.log('Name: AIRTABLE_API_KEY');
console.log('Value:', process.env.AIRTABLE_API_KEY);
console.log('\nVariable 2:');
console.log('Name: AIRTABLE_BASE_ID');
console.log('Value:', process.env.AIRTABLE_BASE_ID);
console.log('\n=================================\n');
console.log('Steps:');
console.log('1. Go to https://vercel.com/');
console.log('2. Select your "smb-research" project');
console.log('3. Click Settings → Environment Variables');
console.log('4. Add both variables above');
console.log('5. Check: Production, Preview, Development');
console.log('6. Click Save');
console.log('7. Go to Deployments → Redeploy latest');
console.log('\n');
