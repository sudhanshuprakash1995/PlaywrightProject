import { test, expect } from '@playwright/test';
import stringSimilarity from 'string-similarity';
import { locators } from '../locators/locators.js';   // ← Import here

test('KAI file upload tests for all models', async ({ browser }) => {
  const b = await browser.newContext({ storageState: "auth.json" });
  const page = await b.newPage();

  // --- Login ---
  await page.goto('https://kai.kumaran.com/chatbot');
  await page.waitForLoadState('networkidle');
  
  await page.locator(locators.loginButton).click();
  await page.locator(locators.toastSuccess).waitFor({ state: 'visible', timeout: 10000 });

  // Optional: Close tour
  try {
    const closeTourButton = page.locator(locators.closeTourButton);
    await closeTourButton.waitFor({ state: 'visible', timeout: 10000 });
    await closeTourButton.click();
  } catch {
    // Tour not shown
  }

  // Helper functions
  const selectModel = async (modelName) => {
    await page.locator(locators.modelSelector).click();
    await page.locator(locators.modelOptionValue).first().waitFor({ state: 'visible', timeout: 10000 });
    
    const agent = page.locator(locators.modelSelector).getByText(modelName);
    await agent.waitFor({ state: 'visible' });
    await agent.click({ delay: 100 });

    await expect(page.locator(locators.modelSelector)).toHaveText(modelName);
    console.log(`Selected model: ${modelName}`);
  };

  const uploadFiles = async (filePaths) => {
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator(locators.fileUploadButton).click()
    ]);

    await fileChooser.setFiles(filePaths);
  };

  const waitForUploadsToComplete = async () => {
    await page.locator(locators.chipUploadSpinner).first().waitFor({ state: 'visible', timeout: 10000 });
    const loadingChips = page.locator(locators.chipUploadSpinner);
    const count = await loadingChips.count();
    
    for (let i = 0; i < count; i++) {
      await loadingChips.nth(i).waitFor({ state: 'hidden', timeout: 10000 });
    }
    console.log(`Upload completed for ${count} file(s)`);
  };

  const removeAllChips = async () => {
    const elements = page.locator(locators.chipRemove);
    await elements.first().waitFor({ state: 'visible', timeout: 10000 });
    
    let count = await elements.count();
    console.log(`Removing ${count} files...`);

    for (let i = 0; i < count; i++) {
      const latestCount = await elements.count();
      await elements.nth(0).click();
      await page.waitForTimeout(500);
      await expect(elements).toHaveCount(latestCount - 1);
    }

    await expect(elements).toHaveCount(0);
  };

  // Test Files
  const files = [
    'C:\\Users\\SudhanshuPrakash\\Downloads\\uat_kai-chatbot-agent.png',
    'C:\\Users\\SudhanshuPrakash\\Downloads\\uat_kai-chatbot-agent1.png',
    'C:\\Users\\SudhanshuPrakash\\Downloads\\uat_kai-chatbot-agent2.png'
  ];

  // Tests
  await page.getByText(locators.newChat).click();
  await selectModel('claude-sonnet-4.6');
  await uploadFiles(files);
  await waitForUploadsToComplete();
  await removeAllChips();

  await selectModel('claude-opus-4.6');
  await uploadFiles(files);
  await waitForUploadsToComplete();
  await removeAllChips();

  await page.getByText(locators.newChat).click();
  await selectModel('GPT-5.1');
  await uploadFiles(files);
  await waitForUploadsToComplete();
  await removeAllChips();

  await page.getByText(locators.newChat).click();
  await selectModel('gpt-4o-mini');
  await uploadFiles(files);
  await waitForUploadsToComplete();
  await removeAllChips();

  // Final verification
  const finalChipCount = await page.locator(locators.chipRemove).count();
  console.log("Final files count:", finalChipCount);
  await expect(finalChipCount).toBe(0);
});