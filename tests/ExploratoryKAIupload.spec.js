import { test, expect } from '@playwright/test'
import stringSimilarity from 'string-similarity';


test('KAI file upload tests for all models', async ({ browser }) => {
  const b = await browser.newContext({ storageState: "auth.json" });
  const page = await b.newPage();

  // --- Login ---
    const url = 'https://kai.kumaran.com/chatbot'   // prod url
  // const url = 'https://kai-uat.kumaran.ai/chatbot'  // uat url

  await page.goto(url)
  await page.waitForLoadState('networkidle');
  await page.locator('button.login-button').click();
  await page.locator('div.toast.success').waitFor({ state: 'visible', timeout: 10000 });

  // Optional: Close tour
  try {
    const closeTourButton = page.locator('button[aria-label="Close Tour"]');
    await closeTourButton.waitFor({ state: 'visible', timeout: 10000 });
    await closeTourButton.click();
  } catch {
    // Tour not shown
  }
  // await page.pause()
  // Helper functions
  const selectModel = async (modelName) => {
    await page.locator('#tour-model-selector').click();
    await page.locator('div.model-option-value').first().waitFor({ state: 'visible', timeout: 10000 });
    
    const agent = page.locator('#tour-model-selector').getByText(modelName);
    await agent.waitFor({ state: 'visible' });
    await agent.click({ delay: 1000 });

    await expect(page.locator('#tour-model-selector')).toHaveText(modelName);
    console.log(`Selected model: ${modelName}`);
  };

  const uploadFiles = async (filePaths) => {
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button[id="tour-file-upload"]').click()
    ]);

    await fileChooser.setFiles(filePaths);
  };

  const waitForUploadsToComplete = async () => {
    const loadingChips = await page.locator('div.chip-progress-bar');
    await page.locator('div.chip-progress-bar').first().waitFor({ state: 'visible', timeout: 10000 });
    const count = await loadingChips.count();
    
    for (let i = 0; i < count; i++) {
      await loadingChips.nth(i).waitFor({ state: 'hidden', timeout: 15000 });
    }
    console.log(`Upload completed for ${count} file(s)`);
  };

  const removeAllChips = async () => {
    const elements = page.locator('button.chip-remove');
    await page.locator('button.chip-remove').first().waitFor({ state: 'visible', timeout: 10000 });
    let count = await elements.count();
    console.log(`Removing ${count} files...`);

    for (let i = 0; i < count; i++) {
      const latestCount = await elements.count();
      await elements.nth(0).click();
      await page.waitForTimeout(500);     // adding delay for click to process
      await expect(await elements).toHaveCount(latestCount - 1);
      // console.log(latestCount - 1)
    }

    await expect(elements).toHaveCount(0);
  };

  // Test Files
  // uat_kai-chatbot-agent
  /*
  const files = [
    'C:\\Users\\SudhanshuPrakash\\Downloads\\uat_kai-chatbot-agent.png',
    'C:\\Users\\SudhanshuPrakash\\Downloads\\uat_kai-chatbot-agent1.png',
    'C:\\Users\\SudhanshuPrakash\\Downloads\\uat_kai-chatbot-agent2.png'
  ];
*/
   const files = [
    'C:\\Users\\SudhanshuPrakash\\Downloads\\Book1.xlsx',
    'C:\\Users\\SudhanshuPrakash\\Downloads\\file_example_XLS_100.xls',
    'C:\\Users\\SudhanshuPrakash\\Downloads\\users_all_20260619_1442.xlsx'
  ];
  
 /*
 const files = [
    'C:\\Users\\SudhanshuPrakash\\Downloads\\GitHubCopilot+Installation.pdf',
    'C:\\Users\\SudhanshuPrakash\\Downloads\\robot_python.pdf',
    'C:\\Users\\SudhanshuPrakash\\Downloads\\peakpx.jpg'
  ];
 */
  // First model
  await page.getByText('New Chat').click();
  await selectModel('claude-sonnet-4.6');
  await uploadFiles(files);
  await waitForUploadsToComplete();
  await removeAllChips();

  // Second model
  await selectModel('claude-opus-4.6');
  await uploadFiles(files);
  await waitForUploadsToComplete();
  await removeAllChips();

  // Third model
  await page.getByText('New Chat').click();
  if(url == 'https://kai.kumaran.com/chatbot')
    {
     await selectModel('GPT-5.1'); 
    }else if(url == 'https://kai-uat.kumaran.ai/chatbot')
    {
    await selectModel('GPT-5');
    }
  await uploadFiles(files);
  await waitForUploadsToComplete();
  await removeAllChips();

  // Fourth model
  await page.getByText('New Chat').click();
  await selectModel('gpt-4o-mini');
  await uploadFiles(files);
  await waitForUploadsToComplete();
  await removeAllChips();

  // Final verification
  const finalChipCount = await page.locator('span.chip-remove').count();
  console.log("Final files count:", finalChipCount);
  await expect(finalChipCount).toBe(0);
});