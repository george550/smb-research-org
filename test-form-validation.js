import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 }
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to form...');
    await page.goto('https://smb-research.org/join', { waitUntil: 'networkidle' });

    // Wait a bit for any initial rendering
    await page.waitForTimeout(2000);

    console.log('Filling Step 1...');
    // Step 1: Personal Information
    await page.fill('input[name="name"]', 'Test User Fix');
    await page.fill('input[name="email"]', 'testfix@example.com');
    await page.fill('input[name="phone"]', '5551234567');

    console.log('Clicking Continue to Business Details...');
    await page.click('button:has-text("Continue to Business Details")');
    await page.waitForTimeout(1000);

    console.log('Filling Step 2...');
    // Step 2: Business Details
    await page.fill('input[name="businessName"]', 'Test Business Fix');
    await page.fill('input[name="city"]', 'San Francisco');

    // Select role (custom Select component) - find by role="combobox"
    const roleButton = page.locator('button[role="combobox"]').first();
    await roleButton.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: 'I own the business' }).click();
    await page.waitForTimeout(500);

    // Select employee count
    const employeeButton = page.locator('button[role="combobox"]').nth(1);
    await employeeButton.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: '3–10' }).click();
    await page.waitForTimeout(500);

    // Select industry
    const industryButton = page.locator('button[role="combobox"]').nth(2);
    await industryButton.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: 'Retail (online or offline stores)' }).click();
    await page.waitForTimeout(500);

    console.log('Clicking Continue to Experience and Tools...');
    await page.click('button:has-text("Continue to Experience and Tools")');

    // Wait for Step 3 to load
    await page.waitForTimeout(2000);

    console.log('Taking Screenshot 1: Step 3 initial load (should have NO errors)');
    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshot-step3-initial.png', fullPage: true });

    // Check for red borders or error messages
    const redBorders = await page.$$('input[class*="border-red"], textarea[class*="border-red"], select[class*="border-red"]');
    const errorMessages = await page.$$('text=/error|required|cannot be empty/i');
    const activeElement = await page.evaluate(() => document.activeElement?.tagName);

    console.log('Initial load check:');
    console.log('- Red borders found:', redBorders.length);
    console.log('- Error messages found:', errorMessages.length);
    console.log('- Active element:', activeElement);

    console.log('Waiting 2 seconds before clicking submit...');
    await page.waitForTimeout(2000);

    console.log('Clicking Submit without filling Step 3...');
    await page.click('button:has-text("Submit My Application")');

    // Wait for validation to trigger
    await page.waitForTimeout(1500);

    console.log('Taking Screenshot 2: After submit (should show errors)');
    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshot-step3-after-submit.png', fullPage: true });

    // Check for errors after submit
    const redBordersAfter = await page.$$('input[class*="border-red"], textarea[class*="border-red"], select[class*="border-red"]');
    const errorMessagesAfter = await page.$$('text=/error|required|cannot be empty/i');

    console.log('After submit check:');
    console.log('- Red borders found:', redBordersAfter.length);
    console.log('- Error messages found:', errorMessagesAfter.length);

    console.log('\n=== TEST COMPLETE ===');
    console.log('Screenshots saved:');
    console.log('1. screenshot-step3-initial.png (should show NO errors)');
    console.log('2. screenshot-step3-after-submit.png (should show errors)');

    // Keep browser open for a moment
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('Error during test:', error);
    await page.screenshot({ path: '/Users/george/smb-research/smb-research/screenshot-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();
