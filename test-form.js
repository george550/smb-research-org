import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Enable console logging
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error));

  try {
    console.log('Step 1: Navigating to the form...');
    await page.goto('https://smb-research.org/join');
    await page.waitForLoadState('networkidle');

    console.log('Step 2: Filling out Personal Details (Step 1)...');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '5551234567');

    console.log('Step 3: Clicking Continue to Business Details...');
    await page.click('button:has-text("Continue to Business Details")');
    await page.waitForTimeout(1000);

    console.log('Step 4: Filling out Business Details (Step 2)...');

    // First, let's see what fields are available
    const step2Fields = await page.evaluate(() => {
      const fields = [];
      const allFields = document.querySelectorAll('input, textarea, select, button');

      allFields.forEach(field => {
        fields.push({
          tag: field.tagName.toLowerCase(),
          name: field.name,
          id: field.id,
          type: field.type,
          placeholder: field.placeholder,
          text: field.textContent?.substring(0, 50)
        });
      });

      return fields;
    });
    console.log('Step 2 fields:', JSON.stringify(step2Fields, null, 2));

    // Try filling by placeholder or visible labels
    await page.fill('input[placeholder*="Business" i], input[id*="business" i], input[name*="business" i]', 'Test Business');
    await page.fill('input[placeholder*="City" i], input[id*="city" i], input[name*="city" i]', 'San Francisco');

    // Try finding and clicking select dropdowns
    const selects = await page.locator('select').all();
    console.log(`Found ${selects.length} select elements`);

    if (selects.length >= 3) {
      await selects[0].selectOption({ index: 1 }); // Role - first option
      await selects[1].selectOption({ index: 1 }); // Employee count
      await selects[2].selectOption({ index: 1 }); // Industry
    }

    console.log('Step 5: Clicking Continue to Experience and Tools...');
    await page.click('button:has-text("Continue to Experience and Tools")');

    // Wait a moment for the step to render
    await page.waitForTimeout(500);

    console.log('\n========================================');
    console.log('STEP 3 LOADED - OBSERVING VALIDATION STATE');
    console.log('========================================\n');

    // Check for red borders (typically applied via CSS classes or inline styles)
    const fieldsWithRedBorder = await page.evaluate(() => {
      const results = [];
      const allInputs = document.querySelectorAll('input, textarea, select');

      allInputs.forEach(input => {
        const styles = window.getComputedStyle(input);
        const borderColor = styles.borderColor;
        const classList = input.className;

        // Check for red border (various possible red values)
        const isRed = borderColor.includes('rgb(239, 68, 68)') ||
                      borderColor.includes('rgb(220, 38, 38)') ||
                      borderColor.includes('rgb(248, 113, 113)') ||
                      classList.includes('border-red') ||
                      classList.includes('error');

        if (isRed) {
          results.push({
            name: input.name || input.id || 'unknown',
            type: input.tagName.toLowerCase(),
            borderColor: borderColor,
            className: classList
          });
        }
      });

      return results;
    });

    console.log('Fields with red borders:', JSON.stringify(fieldsWithRedBorder, null, 2));

    // Check for validation error messages
    const errorMessages = await page.evaluate(() => {
      const results = [];

      // Look for common error message selectors
      const errorElements = document.querySelectorAll(
        '.error, .error-message, .validation-error, [class*="text-red"], [class*="error"]'
      );

      errorElements.forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 0 && text.length < 200) {
          results.push({
            text: text,
            className: el.className,
            tag: el.tagName.toLowerCase()
          });
        }
      });

      return results;
    });

    console.log('Error messages found:', JSON.stringify(errorMessages, null, 2));

    // Check which field is focused
    const focusedElement = await page.evaluate(() => {
      const focused = document.activeElement;
      return {
        name: focused.name || focused.id || 'unknown',
        tag: focused.tagName.toLowerCase(),
        className: focused.className
      };
    });

    console.log('Focused element:', JSON.stringify(focusedElement, null, 2));

    // Get all form fields in Step 3
    const step3Fields = await page.evaluate(() => {
      const fields = [];
      const allFields = document.querySelectorAll('input, textarea, select');

      allFields.forEach(field => {
        const styles = window.getComputedStyle(field);
        const borderColor = styles.borderColor;

        fields.push({
          name: field.name || field.id || 'unknown',
          type: field.tagName.toLowerCase(),
          value: field.value,
          borderColor: borderColor,
          className: field.className,
          required: field.required
        });
      });

      return fields;
    });

    console.log('\nAll Step 3 fields:', JSON.stringify(step3Fields, null, 2));

    // Take screenshot
    console.log('\nTaking screenshot...');
    await page.screenshot({
      path: '/Users/george/smb-research/smb-research/step3-validation.png',
      fullPage: true
    });
    console.log('Screenshot saved to: /Users/george/smb-research/smb-research/step3-validation.png');

    // Wait a bit to observe
    console.log('\nWaiting 5 seconds for manual observation...');
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await browser.close();
  }
})();
