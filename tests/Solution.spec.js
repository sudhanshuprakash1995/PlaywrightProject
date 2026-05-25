import { test, expect } from '@playwright/test';

const BASE_URL   = 'https://rahulshettyacademy.com/AutomationPractice/';


async function moreValidations(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByLabel('Email').fill(GMAIL_USER.email);
  await page.getByPlaceholder('••••••').fill(GMAIL_USER.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

// ── Test 1: 1 ticket → eligible ───────────────────────────────────────────────
test('moreValidations', async ({ page }) => {

  // Go to url
  await page.goto(`${BASE_URL}`);
  const inputBox = page.locator("#displayed-text")
  await expect(inputBox).toBeVisible()
  await page.locator("#hide-textbox").click()
  await expect(inputBox).toBeHidden();
  await page.on("dialog", dialog => dialog.accept())
  await page.locator("#confirmbtn").click()
    await page.waitForTimeout(2000)
    const newFrame = await page.frameLocator("#courses-iframe")
    await newFrame.locator("li a[href*='lifetime-access']:visible").click()
    const st = await newFrame.locator('[style="color: #ec5252;"]').textContent();
    console.log(parseInt(st.replace(/,/g,"")))
});