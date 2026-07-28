# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ExploratoryKAIResumeAnalysis.spec.js >> login test and check JD Analysis for single resume
- Location: tests\ExploratoryKAIResumeAnalysis.spec.js:8:1

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 10
Received:    NaN
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary "Chat sidebar" [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - img "KAI" [ref=e9]
        - generic [ref=e10]: K-AI
      - button [expanded] [ref=e11] [cursor=pointer]:
        - img [ref=e13]
    - generic [ref=e17]:
      - generic "Chatbot" [ref=e18] [cursor=pointer]:
        - img [ref=e20]
        - generic [ref=e22]: Chatbot
      - generic "HR Portal" [ref=e24] [cursor=pointer]:
        - img [ref=e26]
        - generic [ref=e31]:
          - generic [ref=e33]: HR Portal
          - button "Toggle HR Portal menu" [expanded] [ref=e34]:
            - img [ref=e36]
      - generic [ref=e38]:
        - generic "JD Analysis" [ref=e39] [cursor=pointer]:
          - img [ref=e40]
          - generic [ref=e41]: JD Analysis
        - generic "Resume Standardizer" [ref=e42] [cursor=pointer]:
          - img [ref=e44]
          - generic [ref=e47]: Resume Standardizer
    - generic [ref=e51]:
      - generic [ref=e52] [cursor=pointer]:
        - generic [ref=e53]: SP
        - generic [ref=e54]:
          - generic [ref=e55]: Sudhanshu Prakash
          - generic [ref=e56]: sudhanshu.prakash@kumaran.com
      - button "Profile options" [ref=e57] [cursor=pointer]:
        - img [ref=e59]
  - main [ref=e64]:
    - generic [ref=e68]:
      - generic [ref=e69]:
        - generic [ref=e70]:
          - heading "Candidate Analysis Dashboard" [level=1] [ref=e71]
          - paragraph [ref=e72]: Showing 1 candidates matched against job description
        - button "Back to Upload" [ref=e74] [cursor=pointer]:
          - img [ref=e75]
          - text: Back to Upload
      - generic [ref=e77]:
        - generic [ref=e78]: RESUME ANALYSIS
        - table [ref=e80]:
          - rowgroup [ref=e81]:
            - row "CANDIDATE NAME MATCH SCORE EXPERIENCE SKILLS MATCH ACTIONS" [ref=e82]:
              - columnheader "CANDIDATE NAME" [ref=e83]
              - columnheader "MATCH SCORE" [ref=e84]
              - columnheader "EXPERIENCE" [ref=e85]
              - columnheader "SKILLS MATCH" [ref=e86]
              - columnheader "ACTIONS" [ref=e87]
          - rowgroup [ref=e88]:
            - row "Software Testing Engineer Test_enginer_resme.pdf 2.5 yr Reject View" [ref=e89]:
              - cell "Software Testing Engineer Test_enginer_resme.pdf" [ref=e90]:
                - generic [ref=e91]: Software Testing Engineer
                - generic [ref=e92]: Test_enginer_resme.pdf
              - cell [ref=e93]:
                - img [ref=e95]:
                  - generic [ref=e98]: 38%
              - cell "2.5 yr" [ref=e99]
              - cell "Reject" [ref=e100]:
                - generic [ref=e101]: Reject
              - cell "View" [ref=e102]:
                - button "View" [ref=e103] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | import stringSimilarity from 'string-similarity';
  3   | import { locators } from '../locators/locators.js';
  4   | import { KaiChatBot } from '../pageObjects/KaiChatBot.js';
  5   | import  fs  from 'fs';
  6   | 
  7   | 
  8   | test('login test and check JD Analysis for single resume', async ({ browser }) => {
  9   |   const context = await browser.newContext({ storageState: "auth.json" })
  10  |   const page = await context.newPage()
  11  | 
  12  |   // --- Login ---
  13  |   const url = 'https://kai.kumaran.com/chatbot'   // prod url
  14  |   // const url = 'https://kai-uat.kumaran.ai/chatbot'  // uat url
  15  |   const filePath = 'tests/test_data/result.json';
  16  |   
  17  |   await page.goto(url)
  18  |   await page.waitForLoadState('networkidle')
  19  |   await page.locator('button.login-button').click()
  20  |  
  21  |   await page.locator('div.toast.success').waitFor({ state: 'visible', timeout: 10000 });
  22  | 
  23  |   const kai = new KaiChatBot(page)
  24  |   // Optional: Close tour button
  25  |   // await page.pause()
  26  |   await kai.closeTour()
  27  | 
  28  |   // --- Verify Login ---
  29  |   await expect(page.locator('div.user-email')).toHaveText('sudhanshu.prakash@kumaran.com', { timeout: 5000 })
  30  | 
  31  |   // --- Select Model ---
  32  |   // await page.getByText('New Chat').click()
  33  |   // await page.locator('div#tour-model-selector').click()
  34  |   // const agentOptions = page.locator('div.options').first()
  35  |   // await agentOptions.getByText('claude-sonnet-4.6').click()
  36  |   // await kai.selectModel('claude-sonnet-4.6',page);
  37  | 
  38  |   // await page.pause()
  39  |   // --- Basic Prompt Test ---
  40  |   await page.getByText('HR Portal').click();
  41  |   await page.getByText('JD Analysis').click();
  42  |   const [fileChooser] = await Promise.all([
  43  |     page.waitForEvent('filechooser'),
  44  |     page.locator('button.dz-browse-btn').first().click() // your upload button
  45  |   ]);
  46  | 
  47  |   await fileChooser.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\Trainee_Software_Tester_Job_Description 2.pdf']);
  48  |   await expect(page.locator('button[aria-label="Remove file"]')).toBeVisible();
  49  | 
  50  |   const [fileChooser1] = await Promise.all([
  51  |     page.waitForEvent('filechooser'),
  52  |     page.locator('button.dz-browse-btn').last().click() // your upload button
  53  |   ]);
  54  | 
  55  |   // await fileChooser1.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\Raveendra Reddy.docx']);
  56  |   await fileChooser1.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\Test_enginer_resme.pdf']);
  57  |   await expect(await page.locator('button[aria-label="Remove file"]').count()).toBe(2);
  58  |   await page.getByRole('button', { name: ' Analyze Resumes ' }).click({ force: true });
  59  |   await page.locator('div.submitting-overlay').waitFor({ state: 'hidden', timeout: 60000 });
  60  |   const analysisResults = await page.locator('svg.gauge-svg').textContent();
  61  |   console.log('Analysis Results:', analysisResults);
  62  |   
  63  |   
  64  | if (fs.existsSync(filePath)) {
  65  |     const previousData = JSON.parse(
  66  |         fs.readFileSync(filePath, 'utf8')
  67  |     );
  68  | 
  69  |     // Comparison
  70  |     console.log(`Previous Count: ${previousData.analysisResultsPrevious}`);
  71  |     console.log(`Current Count: ${analysisResults}`);
  72  | 
  73  | 
> 74  | expect(Math.abs(previousData.analysisResultsPrevious - analysisResults)).toBeLessThanOrEqual(10);
      |                                                                          ^ Error: expect(received).toBeLessThanOrEqual(expected)
  75  | 
  76  |     
  77  | // const difference = Math.abs(
  78  | //     previousData.analysisResultsPrevious - analysisResults
  79  | // );
  80  | 
  81  | 
  82  | // expect(
  83  | //     difference,
  84  | //     `Difference (${difference}) exceeds allowed threshold of 10`
  85  | // ).toBeLessThanOrEqual(10);
  86  | 
  87  | 
  88  | 
  89  |     // Delete old file
  90  |     fs.unlinkSync(filePath);
  91  | }
  92  | else {
  93  |   
  94  | const currentData = {
  95  |     analysisResultsPrevious: analysisResults
  96  | };
  97  | 
  98  | // Save latest data for next execution
  99  | fs.writeFileSync(
  100 |     filePath,
  101 |     JSON.stringify(currentData, null, 2)
  102 | );
  103 | 
  104 | }
  105 | 
  106 | 
  107 | 
  108 | 
  109 | })
  110 | 
```