import { chromium, type Browser, type Page } from 'playwright';

interface TestReport {
  stage: string;
  timestamp: string;
  status: 'success' | 'error' | 'warning';
  details: string;
  consoleMessages?: string[];
  errors?: string[];
  screenshots?: string[];
}

async function testStep3Form() {
  const report: TestReport[] = [];
  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    // Launch browser with DevTools
    console.log('🚀 Launching browser...\n');
    browser = await chromium.launch({
      headless: false,
      devtools: true
    });

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });

    page = await context.newPage();

    // Collect console messages
    const consoleMessages: string[] = [];
    const errorMessages: string[] = [];

    page.on('console', msg => {
      const text = `[${msg.type().toUpperCase()}] ${msg.text()}`;
      consoleMessages.push(text);
      console.log(text);
    });

    page.on('pageerror', error => {
      const text = `[PAGE ERROR] ${error.message}`;
      errorMessages.push(text);
      console.error(text);
    });

    // Stage 1: Navigate to the page
    console.log('📍 Stage 1: Navigating to https://www.smb-research.org/join\n');
    await page.goto('https://www.smb-research.org/join', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    report.push({
      stage: 'Navigation',
      timestamp: new Date().toISOString(),
      status: 'success',
      details: 'Successfully navigated to join page',
      consoleMessages: [...consoleMessages],
      errors: [...errorMessages]
    });

    await page.screenshot({ path: 'step1-initial.png' });
    consoleMessages.length = 0;
    errorMessages.length = 0;

    // Stage 2: Fill and submit Step 1
    console.log('✏️  Stage 2: Filling Step 1 (name, email, phone)\n');

    await page.waitForSelector('input[name="name"], input[id*="name"], input[placeholder*="name" i]', { timeout: 10000 });

    // Try to find and fill name field
    const nameSelectors = [
      'input[name="name"]',
      'input[id*="name"]',
      'input[placeholder*="name" i]'
    ];

    for (const selector of nameSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.fill('Test User');
          console.log(`✓ Filled name field using selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    // Try to find and fill email field
    const emailSelectors = [
      'input[name="email"]',
      'input[type="email"]',
      'input[id*="email"]',
      'input[placeholder*="email" i]'
    ];

    for (const selector of emailSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.fill('test@example.com');
          console.log(`✓ Filled email field using selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    // Try to find and fill phone field
    const phoneSelectors = [
      'input[name="phone"]',
      'input[type="tel"]',
      'input[id*="phone"]',
      'input[placeholder*="phone" i]'
    ];

    for (const selector of phoneSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.fill('5551234567');
          console.log(`✓ Filled phone field using selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    await page.screenshot({ path: 'step1-filled.png' });

    // Find and click Next/Continue button
    const nextButtonSelectors = [
      'button:has-text("Next")',
      'button:has-text("Continue")',
      'button[type="submit"]',
      'button:has-text("Submit")'
    ];

    for (const selector of nextButtonSelectors) {
      try {
        const button = await page.$(selector);
        if (button) {
          console.log(`✓ Clicking button using selector: ${selector}`);
          await button.click();
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    await page.waitForTimeout(2000);

    report.push({
      stage: 'Step 1 Submission',
      timestamp: new Date().toISOString(),
      status: errorMessages.length > 0 ? 'warning' : 'success',
      details: 'Filled and submitted Step 1 form',
      consoleMessages: [...consoleMessages],
      errors: [...errorMessages]
    });

    await page.screenshot({ path: 'step2-initial.png' });
    consoleMessages.length = 0;
    errorMessages.length = 0;

    // Stage 3: Fill and submit Step 2
    console.log('\n✏️  Stage 3: Filling Step 2 (business details)\n');

    await page.waitForTimeout(1000);

    // Try to find business-related fields
    const businessSelectors = [
      'input[name*="business" i]',
      'input[name*="company" i]',
      'input[placeholder*="business" i]',
      'input[placeholder*="company" i]'
    ];

    for (const selector of businessSelectors) {
      try {
        const elements = await page.$$(selector);
        for (let i = 0; i < elements.length; i++) {
          const isVisible = await elements[i].isVisible();
          if (isVisible) {
            await elements[i].fill(`Test Business ${i + 1}`);
            console.log(`✓ Filled business field ${i + 1} using selector: ${selector}`);
          }
        }
      } catch (e) {
        // Try next selector
      }
    }

    // Fill any other visible input fields
    const visibleInputs = await page.$$('input:visible');
    console.log(`Found ${visibleInputs.length} visible input fields`);

    for (let i = 0; i < visibleInputs.length; i++) {
      try {
        const type = await visibleInputs[i].getAttribute('type');
        const name = await visibleInputs[i].getAttribute('name');
        const value = await visibleInputs[i].inputValue();

        if (!value && type !== 'submit' && type !== 'button') {
          await visibleInputs[i].fill(`Test Value ${i + 1}`);
          console.log(`✓ Filled input field: ${name || type || 'unknown'}`);
        }
      } catch (e) {
        // Skip if can't fill
      }
    }

    await page.screenshot({ path: 'step2-filled.png' });

    // Click Next/Continue button for Step 2
    for (const selector of nextButtonSelectors) {
      try {
        const button = await page.$(selector);
        if (button) {
          console.log(`✓ Clicking button using selector: ${selector}`);
          await button.click();
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    report.push({
      stage: 'Step 2 Submission',
      timestamp: new Date().toISOString(),
      status: errorMessages.length > 0 ? 'warning' : 'success',
      details: 'Filled and submitted Step 2 form',
      consoleMessages: [...consoleMessages],
      errors: [...errorMessages]
    });

    // Stage 4: Critical - Observe Step 3 loading
    console.log('\n🔍 Stage 4: CRITICAL - Observing Step 3 loading behavior\n');
    console.log('⏱️  Waiting 3 seconds to observe initial behavior...\n');

    await page.waitForTimeout(3000);

    consoleMessages.length = 0;
    errorMessages.length = 0;

    await page.screenshot({ path: 'step3-initial.png' });

    // Check for page responsiveness
    console.log('🧪 Testing page responsiveness...\n');

    let isResponsive = true;
    try {
      await page.evaluate(() => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 100);
        });
      });
      console.log('✓ Page is responsive to JavaScript execution');
    } catch (e) {
      isResponsive = false;
      console.error('✗ Page appears unresponsive to JavaScript execution');
    }

    // Check for visible error messages
    const errorMessageSelectors = [
      '.error',
      '[class*="error"]',
      '[role="alert"]',
      '.alert-error',
      '[class*="alert"]'
    ];

    const visibleErrors: string[] = [];
    for (const selector of errorMessageSelectors) {
      try {
        const elements = await page.$$(selector);
        for (const element of elements) {
          const isVisible = await element.isVisible();
          if (isVisible) {
            const text = await element.textContent();
            if (text) {
              visibleErrors.push(text.trim());
            }
          }
        }
      } catch (e) {
        // Skip if selector doesn't work
      }
    }

    if (visibleErrors.length > 0) {
      console.log('⚠️  Visible error messages found:');
      visibleErrors.forEach(err => console.log(`   - ${err}`));
    } else {
      console.log('✓ No visible error messages detected');
    }

    // Check for form fields
    const step3Inputs = await page.$$('input:visible');
    console.log(`✓ Found ${step3Inputs.length} visible input fields in Step 3`);

    // Try to interact with form fields
    console.log('\n🖱️  Testing interaction with form fields...\n');

    let canInteract = true;
    if (step3Inputs.length > 0) {
      try {
        await step3Inputs[0].focus();
        console.log('✓ Successfully focused first input field');
        await page.waitForTimeout(500);
        await step3Inputs[0].type('Test');
        console.log('✓ Successfully typed in first input field');
      } catch (e) {
        canInteract = false;
        console.error(`✗ Cannot interact with form fields: ${e}`);
      }
    }

    report.push({
      stage: 'Step 3 Initial Load',
      timestamp: new Date().toISOString(),
      status: (!isResponsive || errorMessages.length > 0) ? 'error' : 'success',
      details: `Step 3 loaded. Responsive: ${isResponsive}, Can interact: ${canInteract}, Visible errors: ${visibleErrors.length}, Console errors: ${errorMessages.length}`,
      consoleMessages: [...consoleMessages],
      errors: [...errorMessages]
    });

    // Stage 5: Click through Step 3 fields without filling
    console.log('\n🖱️  Stage 5: Clicking through Step 3 fields without filling\n');

    consoleMessages.length = 0;
    errorMessages.length = 0;

    for (let i = 0; i < Math.min(step3Inputs.length, 5); i++) {
      try {
        console.log(`Clicking field ${i + 1}...`);
        await step3Inputs[i].click();
        await page.waitForTimeout(500);
      } catch (e) {
        console.error(`Error clicking field ${i + 1}: ${e}`);
      }
    }

    await page.screenshot({ path: 'step3-clicked-through.png' });

    report.push({
      stage: 'Step 3 Field Interaction',
      timestamp: new Date().toISOString(),
      status: errorMessages.length > 0 ? 'warning' : 'success',
      details: 'Clicked through Step 3 fields without filling',
      consoleMessages: [...consoleMessages],
      errors: [...errorMessages]
    });

    // Stage 6: Fill Step 3 and submit
    console.log('\n✏️  Stage 6: Filling Step 3 and submitting\n');

    consoleMessages.length = 0;
    errorMessages.length = 0;

    const currentInputs = await page.$$('input:visible');
    for (let i = 0; i < currentInputs.length; i++) {
      try {
        const type = await currentInputs[i].getAttribute('type');
        const name = await currentInputs[i].getAttribute('name');

        if (type !== 'submit' && type !== 'button') {
          await currentInputs[i].fill(`Step3Value${i + 1}`);
          console.log(`✓ Filled field: ${name || type || `field-${i + 1}`}`);
        }
      } catch (e) {
        console.error(`Could not fill field ${i + 1}: ${e}`);
      }
    }

    await page.screenshot({ path: 'step3-filled.png' });

    // Try to submit
    console.log('\nAttempting to submit Step 3...');

    for (const selector of nextButtonSelectors) {
      try {
        const button = await page.$(selector);
        if (button) {
          const isVisible = await button.isVisible();
          if (isVisible) {
            console.log(`✓ Clicking submit button using selector: ${selector}`);
            await button.click();
            break;
          }
        }
      } catch (e) {
        // Try next selector
      }
    }

    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'step3-submitted.png' });

    report.push({
      stage: 'Step 3 Submission',
      timestamp: new Date().toISOString(),
      status: errorMessages.length > 0 ? 'error' : 'success',
      details: 'Filled and submitted Step 3 form',
      consoleMessages: [...consoleMessages],
      errors: [...errorMessages]
    });

    // Print final report
    console.log('\n' + '='.repeat(80));
    console.log('📊 DETAILED TEST REPORT');
    console.log('='.repeat(80) + '\n');

    report.forEach((entry, index) => {
      console.log(`\n${index + 1}. ${entry.stage}`);
      console.log(`   Timestamp: ${entry.timestamp}`);
      console.log(`   Status: ${entry.status.toUpperCase()}`);
      console.log(`   Details: ${entry.details}`);

      if (entry.errors && entry.errors.length > 0) {
        console.log(`   Errors (${entry.errors.length}):`);
        entry.errors.forEach(err => console.log(`      - ${err}`));
      }

      if (entry.consoleMessages && entry.consoleMessages.length > 0) {
        console.log(`   Console Messages (${entry.consoleMessages.length}):`);
        entry.consoleMessages.slice(0, 10).forEach(msg => console.log(`      - ${msg}`));
        if (entry.consoleMessages.length > 10) {
          console.log(`      ... and ${entry.consoleMessages.length - 10} more`);
        }
      }
      console.log('   ' + '-'.repeat(76));
    });

    console.log('\n' + '='.repeat(80));
    console.log('✅ Test completed successfully!');
    console.log('='.repeat(80) + '\n');

    console.log('📸 Screenshots saved:');
    console.log('   - step1-initial.png');
    console.log('   - step1-filled.png');
    console.log('   - step2-initial.png');
    console.log('   - step2-filled.png');
    console.log('   - step3-initial.png');
    console.log('   - step3-clicked-through.png');
    console.log('   - step3-filled.png');
    console.log('   - step3-submitted.png\n');

    // Keep browser open for manual inspection
    console.log('🔍 Browser will remain open for 30 seconds for manual inspection...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('\n❌ Test failed with error:', error);

    if (page) {
      await page.screenshot({ path: 'error-screenshot.png' });
      console.log('📸 Error screenshot saved to: error-screenshot.png');
    }

    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the test
testStep3Form().catch(console.error);
