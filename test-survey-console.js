// Test script for browser console - copy and paste this into the browser console
(async function testSurvey() {
  console.log('🧪 Testing /api/survey-participants endpoint...');

  const testData = {
    name: "Console Test User",
    email: "console@test.com",
    phone: "5555551234",
    businessName: "Console Test Business",
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
    referralSource: "Console Test"
  };

  try {
    console.log('📤 Sending request with data:', testData);

    const response = await fetch('/api/survey-participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);

    const responseText = await response.text();
    console.log('📥 Response text:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('📥 Response data:', responseData);
    } catch (e) {
      console.error('❌ Failed to parse JSON:', e);
    }

    if (response.ok) {
      console.log('✅ SUCCESS! Survey submission worked');
      return responseData;
    } else {
      console.error('❌ FAILED! Status:', response.status);
      return null;
    }
  } catch (error) {
    console.error('❌ ERROR:', error);
    throw error;
  }
})();
