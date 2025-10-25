const fetch = require('node-fetch');

const testData = {
  name: "Test User",
  email: "test@example.com",
  phone: "4155551234",
  businessName: "Test Business",
  city: "San Francisco",
  role: "I own the business",
  employeeCount: "1–2",
  industry: "Retail (online or offline stores)",
  responsibilities: ["Sending invoices or collecting customer payments"],
  tools: ["QuickBooks / Xero"],
  marketingChannels: ["Social media (Facebook, Instagram, LinkedIn, etc.)"],
  websiteTool: "Squarespace / Wix / WordPress",
  financeFrequency: "Daily",
  cashFlowStory: "Last month, a major client paid 30 days late, which made it difficult to cover payroll...",
  comfortableDiscussing: "Yes",
  referralSource: "Test"
};

async function testSubmission() {
  try {
    const response = await fetch('http://localhost:5173/api/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', JSON.stringify(result, null, 2));

    if (!response.ok) {
      console.log('\n❌ Submission failed!');
    } else {
      console.log('\n✅ Submission succeeded!');
    }
  } catch (error) {
    console.error('❌ Request error:', error.message);
  }
}

testSubmission();
