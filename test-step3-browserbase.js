// Playwright script to test Step 3 validation issue
// Copy and paste this into browserbase to test and get session replay

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500 // Slow down by 500ms to make it easier to observe
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  // Listen for console messages
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type()}: ${msg.text()}`);
  });

  // Listen for errors
  page.on('pageerror', error => {
    console.error(`[PAGE ERROR] ${error.message}`);
  });

  console.log('=== Starting Step 3 Validation Test ===\n');

  try {
    // Navigate to the form
    console.log('Step 1: Navigating to form...');
    await page.goto('https://www.smb-research.org/join', {
      waitUntil: 'networkidle'
    });
    await page.waitForTimeout(2000);
    console.log('✓ Form loaded\n');

    // Fill Step 1
    console.log('Step 2: Filling Step 1 (Personal Details)...');
    await page.fill('input[id="name"]', 'Debug Test User');
    await page.fill('input[id="email"]', 'debug@test.com');
    await page.fill('input[id="phone"]', '4151234567');
    console.log('✓ Step 1 fields filled');

    // Click continue to Step 2
    await page.click('button:has-text("Continue to Business Details")');
    await page.waitForTimeout(1000);
    console.log('✓ Advanced to Step 2\n');

    // Fill Step 2
    console.log('Step 3: Filling Step 2 (Business Details)...');
    await page.fill('input[id="businessName"]', 'Debug Test Business');
    await page.fill('input[id="city"]', 'San Francisco');

    // Select role
    await page.click('button[role="combobox"]:has-text("Select your role")');
    await page.waitForTimeout(500);
    await page.click('text=I own the business');
    await page.waitForTimeout(500);

    // Select employee count
    await page.click('button[role="combobox"]:has-text("Select employee count")');
    await page.waitForTimeout(500);
    await page.click('text=3–10');
    await page.waitForTimeout(500);

    // Select industry
    await page.click('button[role="combobox"]:has-text("Select industry")');
    await page.waitForTimeout(500);
    await page.click('text=Retail (online or offline stores)');
    await page.waitForTimeout(500);

    console.log('✓ Step 2 fields filled\n');

    // ===== CRITICAL MOMENT: Moving to Step 3 =====
    console.log('Step 4: ⚠️  CRITICAL - Clicking "Continue to Experience and Tools"...');
    console.log('Watching for infinite loop, page freeze, or premature validation errors...\n');

    await page.click('button:has-text("Continue to Experience and Tools")');

    // Wait and observe
    console.log('Waiting 3 seconds to observe Step 3 behavior...');
    await page.waitForTimeout(3000);

    // Check for validation errors appearing immediately (they shouldn't be there)
    const errorMessages = await page.locator('p.text-red-500').count();
    const redBorders = await page.locator('.border-red-500').count();

    console.log('\n=== Step 3 Load Results ===');
    console.log(`Red error messages visible: ${errorMessages}`);
    console.log(`Red borders on fields: ${redBorders}`);

    if (errorMessages > 0 || redBorders > 0) {
      console.log('❌ BUG DETECTED: Validation errors are showing immediately!');
      console.log('Expected: No errors until user tries to submit Step 3');

      // Get the error text
      const errors = await page.locator('p.text-red-500').allTextContents();
      console.log('Error messages:', errors);
    } else {
      console.log('✓ No premature validation errors - this is correct behavior');
    }

    // Check if page is responsive
    console.log('\nTesting page responsiveness...');
    const isPageFrozen = await page.evaluate(() => {
      // Try to execute JavaScript - if page is frozen, this will timeout
      return new Promise((resolve) => {
        setTimeout(() => resolve(false), 100);
      });
    });

    if (isPageFrozen) {
      console.log('❌ BUG DETECTED: Page appears to be frozen!');
    } else {
      console.log('✓ Page is responsive');
    }

    // Try interacting with a field
    console.log('\nTesting field interaction...');
    const firstCheckbox = await page.locator('div[class*="border-2"][class*="cursor-pointer"]').first();
    await firstCheckbox.click();
    await page.waitForTimeout(500);
    console.log('✓ Successfully clicked a field\n');

    // Take a screenshot
    await page.screenshot({
      path: '/tmp/step3-test-result.png',
      fullPage: true
    });
    console.log('✓ Screenshot saved to /tmp/step3-test-result.png\n');

    console.log('=== Test Complete ===');
    console.log('Leave browser open to review the form state and console');
    console.log('Check browserbase session replay for detailed playback\n');

    // Keep browser open for 30 seconds so you can inspect
    console.log('Keeping browser open for 30 seconds for inspection...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('\n❌ TEST FAILED WITH ERROR:');
    console.error(error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();
