import { chromium } from 'playwright';

async function testStep3Validation() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Collect all console logs
  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    consoleLogs.push({ type, text, timestamp: new Date().toISOString() });
    console.log(`[${type.toUpperCase()}] ${text}`);
  });

  try {
    console.log('=== Starting Step 3 Validation Test ===\n');

    // Navigate to production URL
    console.log('1. Navigating to production URL: https://www.smb-research.org...');
    await page.goto('https://www.smb-research.org', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Navigate to /join page
    console.log('2. Navigating to /join page...');
    await page.goto('https://www.smb-research.org/join', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Take initial screenshot
    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshots/step0-initial.png', fullPage: true });
    console.log('   Screenshot saved: step0-initial.png\n');

    // Step 1: Fill personal details
    console.log('3. Filling Step 1 (Personal Details)...');
    await page.fill('input#name', 'Test User Debug');
    await page.fill('input#email', 'testdebug@example.com');
    await page.fill('input#phone', '4151234567');
    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshots/step1-filled.png', fullPage: true });
    console.log('   Step 1 filled\n');

    // Click Continue to Business Details
    console.log('4. Clicking "Continue to Business Details"...');
    await page.click('button:has-text("Continue to Business Details")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshots/step2-loaded.png', fullPage: true });
    console.log('   Navigated to Step 2\n');

    // Step 2: Fill business details
    console.log('5. Filling Step 2 (Business Details)...');
    await page.fill('input#businessName', 'Test Debug Business');
    await page.fill('input#city', 'San Francisco');

    // Select role dropdown - using keyboard navigation (more reliable for shadcn Select)
    console.log('   Selecting role...');
    const roleButton = page.locator('button[role="combobox"]').filter({ hasText: 'Select your role' });
    await roleButton.click();
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown'); // Navigate to first option
    await page.waitForTimeout(200);
    await page.keyboard.press('Enter'); // Select the option
    await page.waitForTimeout(500);
    console.log('   Role selected (first option)');

    // Select employee count dropdown - using keyboard navigation
    console.log('   Selecting employee count...');
    const employeeButton = page.locator('button[role="combobox"]').filter({ hasText: 'Select employee count' });
    await employeeButton.click();
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown'); // Navigate to first option (Just me)
    await page.waitForTimeout(200);
    await page.keyboard.press('ArrowDown'); // Navigate to second option (2)
    await page.waitForTimeout(200);
    await page.keyboard.press('ArrowDown'); // Navigate to third option (3-10)
    await page.waitForTimeout(200);
    await page.keyboard.press('Enter'); // Select 3-10
    await page.waitForTimeout(500);
    console.log('   Employee count selected: 3-10');

    // Select industry dropdown - using keyboard navigation
    console.log('   Selecting industry...');
    const industryButton = page.locator('button[role="combobox"]').filter({ hasText: 'Select industry' });
    await industryButton.click();
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown'); // Navigate to first option
    await page.waitForTimeout(200);
    await page.keyboard.press('Enter'); // Select the first option
    await page.waitForTimeout(500);
    console.log('   Industry selected (first option)');

    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshots/step2-filled.png', fullPage: true });
    console.log('   Step 2 filled\n');

    // Clear console logs before the critical step
    consoleLogs.length = 0;

    // Click Continue to Experience and Tools
    console.log('6. Clicking "Continue to Experience and Tools"...');
    console.log('   [MONITORING CONSOLE LOGS CLOSELY]\n');

    await page.click('button:has-text("Continue to Experience and Tools")');

    // IMMEDIATELY capture the state after Step 3 loads
    await page.waitForTimeout(100); // Very short wait
    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshots/step3-immediate.png', fullPage: true });
    console.log('   Screenshot saved: step3-immediate.png (immediately after load)\n');

    // Wait a bit and capture again
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshots/step3-500ms.png', fullPage: true });
    console.log('   Screenshot saved: step3-500ms.png (after 500ms)\n');

    // Wait more and capture again
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshots/step3-1500ms.png', fullPage: true });
    console.log('   Screenshot saved: step3-1500ms.png (after 1500ms)\n');

    // Check for validation errors on the page
    console.log('7. Checking for validation errors on Step 3...');
    const errorMessages = await page.locator('.text-destructive, .text-red-500, [role="alert"]').allTextContents();
    const visibleErrors = errorMessages.filter(msg => msg.trim().length > 0);

    console.log(`   Found ${visibleErrors.length} validation error messages:\n`);
    if (visibleErrors.length > 0) {
      visibleErrors.forEach((error, index) => {
        console.log(`   Error ${index + 1}: "${error}"`);
      });
    } else {
      console.log('   No validation errors visible on the page');
    }
    console.log('');

    // Check which fields have error styling
    const fieldsWithErrors = await page.evaluate(() => {
      const errorFields = [];
      const inputs = document.querySelectorAll('input, select, textarea, button[role="combobox"]');
      inputs.forEach(input => {
        const hasErrorClass = input.classList.contains('border-destructive') ||
                            input.classList.contains('border-red-500') ||
                            input.parentElement?.querySelector('.text-destructive, .text-red-500');
        if (hasErrorClass) {
          errorFields.push({
            name: input.name || input.id || 'unnamed',
            type: input.type || input.tagName.toLowerCase()
          });
        }
      });
      return errorFields;
    });

    console.log(`8. Fields showing error styling (${fieldsWithErrors.length}):`);
    if (fieldsWithErrors.length > 0) {
      fieldsWithErrors.forEach((field, index) => {
        console.log(`   Field ${index + 1}: ${field.name} (${field.type})`);
      });
    } else {
      console.log('   No fields have error styling');
    }
    console.log('');

    // Take final screenshot
    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshots/step3-final.png', fullPage: true });

    // Save console logs to JSON file for detailed analysis
    const fs = require('fs');
    const logData = {
      timestamp: new Date().toISOString(),
      testUrl: 'https://www.smb-research.org',
      consoleLogs,
      errorMessages: visibleErrors,
      fieldsWithErrors
    };
    fs.writeFileSync('/Users/george/smb-research/smb-research/test-results.json', JSON.stringify(logData, null, 2));
    console.log('9. Console logs saved to test-results.json\n');

    // Print all console logs captured during Step 3 transition
    console.log('=== CONSOLE LOGS FROM STEP 3 TRANSITION ===\n');
    const debugLogs = consoleLogs.filter(log => log.text.includes('[DEBUG]') || log.text.includes('useEffect') || log.text.includes('nextStep'));

    if (debugLogs.length > 0) {
      console.log('Debug logs found:');
      debugLogs.forEach((log, index) => {
        console.log(`${index + 1}. [${log.type}] ${log.text}`);
      });
    } else {
      console.log('No [DEBUG] logs found. All console logs:');
      consoleLogs.forEach((log, index) => {
        console.log(`${index + 1}. [${log.type}] ${log.text}`);
      });
    }

    console.log('\n=== TEST COMPLETE ===');
    console.log(`Total console logs captured: ${consoleLogs.length}`);
    console.log('Screenshots saved in /Users/george/smb-research/smb-research/screenshots/');

    // Keep browser open for 5 seconds to allow manual inspection
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('Error during test:', error);
    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshots/error.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

testStep3Validation();
