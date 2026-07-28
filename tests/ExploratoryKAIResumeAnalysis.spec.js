import { test, expect } from '@playwright/test'
import stringSimilarity from 'string-similarity';
import { locators } from '../locators/locators.js';
import { KaiChatBot } from '../pageObjects/KaiChatBot.js';
import fs from 'fs';

for (let i = 1; i <= 2; i++) {

  test(`login test and check JD Analysis for single resume part ${i}`, async ({ browser }) => {
    const context = await browser.newContext({ storageState: "auth.json" })
    const page = await context.newPage()

    // --- Login ---
    const url = 'https://kai.kumaran.com/chatbot'   // prod url
    // const url = 'https://kai-uat.kumaran.ai/chatbot'  // uat url
    const filePath = 'tests/test_data/result.json';

    await page.goto(url)
    await page.waitForLoadState('networkidle')
    await page.locator('button.login-button').click()

    await page.locator('div.toast.success').waitFor({ state: 'visible', timeout: 10000 });

    const kai = new KaiChatBot(page)
    // Optional: Close tour button
    // await page.pause()
    await kai.closeTour()

    // --- Verify Login ---
    await expect(page.locator('div.user-email')).toHaveText('sudhanshu.prakash@kumaran.com', { timeout: 5000 })

    // --- Select Model ---
    // await page.getByText('New Chat').click()
    // await page.locator('div#tour-model-selector').click()
    // const agentOptions = page.locator('div.options').first()
    // await agentOptions.getByText('claude-sonnet-4.6').click()
    // await kai.selectModel('claude-sonnet-4.6',page);

    // await page.pause()
    // --- Basic Prompt Test ---
    await page.getByText('HR Portal').click();
    await page.getByText('JD Analysis').click();
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button.dz-browse-btn').first().click() // your upload button
    ]);

    await fileChooser.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\Trainee_Software_Tester_Job_Description 2.pdf']);
    await expect(page.locator('button[aria-label="Remove file"]')).toBeVisible();

    const [fileChooser1] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button.dz-browse-btn').last().click() // your upload button
    ]);

    // await fileChooser1.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\Raveendra Reddy.docx']);
    await fileChooser1.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\Test_enginer_resme.pdf']);
    await expect(await page.locator('button[aria-label="Remove file"]').count()).toBe(2);
    await page.getByRole('button', { name: ' Analyze Resumes ' }).click({ force: true });
    await page.locator('div.submitting-overlay').waitFor({ state: 'hidden', timeout: 60000 });
    const analysisResults = await page.locator('svg.gauge-svg').textContent();
    console.log('Analysis Results:', analysisResults);

    //checking if the file exists, if yes then compare the previous and current results, else create a new file with current results
    if (fs.existsSync(filePath)) {
      const previousData = JSON.parse(
        fs.readFileSync(filePath, 'utf8')
      );

      // Delete old file
      fs.unlinkSync(filePath);

      // Comparison
      console.log(`Previous Count: ${previousData.analysisResultsPrevious}`);
      console.log(`Current Count: ${analysisResults}`);

      const difference = Math.abs(Number(previousData.analysisResultsPrevious.replace('%', '')) - Number(analysisResults.replace('%', '')));
      console.log(`Values: ${Number(previousData.analysisResultsPrevious.replace('%', ''))}, ${Number(analysisResults.replace('%', ''))} ${difference}`);

      expect(difference).toBeLessThanOrEqual(10);


    }
    else {

      const currentData = {
        analysisResultsPrevious: analysisResults
      };

      // Save latest data for next executionl̥
      fs.writeFileSync(
        filePath,
        JSON.stringify(currentData, null, 2)
      );

    }




  })

}
