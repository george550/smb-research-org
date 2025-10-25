// Test script for browser console
// Open http://localhost:5173 and paste this entire script

(async function testBothForms() {
  console.log('🧪 Testing both /join and /survey endpoints...\n');

  const testData = {
    name: "Console Test",
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
    cashFlowStory: "Last month, a major client paid 30 days late, which made it difficult to cover payroll and operational expenses.",
    comfortableDiscussing: "Yes",
    referralSource: "Console Test"
  };

  // Test /survey endpoint (Survey Participants table)
  console.log('📤 Testing /api/survey-participants...');
  try {
    const surveyResponse = await fetch('/api/survey-participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    if (surveyResponse.ok) {
      const surveyData = await surveyResponse.json();
      console.log('✅ /survey SUCCESS:', surveyData);
    } else {
      const errorText = await surveyResponse.text();
      console.error('❌ /survey FAILED:', surveyResponse.status, errorText);
    }
  } catch (error) {
    console.error('❌ /survey ERROR:', error);
  }

  console.log('\n');

  // Test /join endpoint (Participants table)
  console.log('📤 Testing /api/participants...');
  try {
    const joinResponse = await fetch('/api/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...testData,
        linkedInProfile: 'https://linkedin.com/in/test'
      })
    });

    if (joinResponse.ok) {
      const joinData = await joinResponse.json();
      console.log('✅ /join SUCCESS:', joinData);
    } else {
      const errorText = await joinResponse.text();
      console.error('❌ /join FAILED:', joinResponse.status, errorText);
    }
  } catch (error) {
    console.error('❌ /join ERROR:', error);
  }

  console.log('\n✅ All tests complete! Both forms should now work.');
})();
