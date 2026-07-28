# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ExploratoryKAIResumeAnalysis.spec.js >> login test and check JD Analysis for single resume
- Location: tests\ExploratoryKAIResumeAnalysis.spec.js:7:1

# Error details

```
Error: locator.click: Unexpected token ""] >> nth=0"" while parsing css selector "button.dz-browse-btn"] >> nth=0". Did you mean to CSS.escape it?
Call log:
  - waiting for button.dz-browse-btn"] >> nth=0

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
    - generic [ref=e69]:
      - generic [ref=e70]:
        - generic [ref=e71]:
          - generic [ref=e72]: 👋
          - generic [ref=e73]:
            - generic [ref=e74]: Welcome to KAI
            - generic [ref=e75]: HR Intelligence
        - generic [ref=e76]: Upload a job description or paste a Linkedin profile to begin analysis
      - generic [ref=e77]:
        - generic [ref=e78]:
          - generic [ref=e79]:
            - generic [ref=e80]: Upload Job Description
            - generic [ref=e82]:
              - generic:
                - status "Job Description upload 78 percent":
                  - generic: 78%
              - status [ref=e83]:
                - img [ref=e84]
                - generic [ref=e85]: No files selected
          - generic [ref=e86]:
            - generic [ref=e87]: Upload Resumes
            - generic [ref=e89]:
              - generic [ref=e91]:
                - img [ref=e93]
                - generic [ref=e94]:
                  - generic [ref=e95]: Drag & drop or browse files from your computer
                  - generic [ref=e96]: You can upload up to 5 resumes
                - button "Browse Files" [ref=e97] [cursor=pointer]:
                  - text: Browse Files
                  - img [ref=e98]
              - status [ref=e99]:
                - img [ref=e100]
                - generic [ref=e101]: No resumes uploaded yet
                - generic [ref=e102]: 0/5 uploaded
        - button "Analyze Resumes" [disabled] [ref=e104] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import stringSimilarity from 'string-similarity';
  3  | import { locators } from '../locators/locators.js';
  4  | import { KaiChatBot } from '../pageObjects/KaiChatBot.js';
  5  | 
  6  | 
  7  | test('login test and check JD Analysis for single resume', async ({ browser }) => {
  8  |   const context = await browser.newContext({ storageState: "auth.json" })
  9  |   const page = await context.newPage()
  10 | 
  11 |   // --- Login ---
  12 |   const url = 'https://kai.kumaran.com/chatbot'   // prod url
  13 |   // const url = 'https://kai-uat.kumaran.ai/chatbot'  // uat url
  14 |   
  15 |   await page.goto(url)
  16 |   await page.waitForLoadState('networkidle')
  17 |   await page.locator('button.login-button').click()
  18 |  
  19 |   await page.locator('div.toast.success').waitFor({ state: 'visible', timeout: 10000 });
  20 | 
  21 |   const kai = new KaiChatBot(page)
  22 |   // Optional: Close tour button
  23 |   // await page.pause()
  24 |   await kai.closeTour()
  25 | 
  26 |   // --- Verify Login ---
  27 |   await expect(page.locator('div.user-email')).toHaveText('sudhanshu.prakash@kumaran.com', { timeout: 5000 })
  28 | 
  29 |   // --- Select Model ---
  30 |   // await page.getByText('New Chat').click()
  31 |   // await page.locator('div#tour-model-selector').click()
  32 |   // const agentOptions = page.locator('div.options').first()
  33 |   // await agentOptions.getByText('claude-sonnet-4.6').click()
  34 |   // await kai.selectModel('claude-sonnet-4.6',page);
  35 | 
  36 |   // await page.pause()
  37 |   // --- Basic Prompt Test ---
  38 |   await page.getByText('HR Portal').click();
  39 |   await page.getByText('JD Analysis').click();
  40 |   const [fileChooser] = await Promise.all([
  41 |     page.waitForEvent('filechooser'),
  42 |     page.locator('button.dz-browse-btn').first().click() // your upload button
  43 |   ]);
  44 | 
  45 |   await fileChooser.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\Trainee_Software_Tester_Job_Description 2.pdf']);
  46 |   await page.locator('button[aria-label="Remove file"]')
  47 | 
  48 |   const [fileChooser1] = await Promise.all([
  49 |     page.waitForEvent('filechooser'),
> 50 |     page.locator('button.dz-browse-btn"]').first().click() // your upload button
     |                                                    ^ Error: locator.click: Unexpected token ""] >> nth=0"" while parsing css selector "button.dz-browse-btn"] >> nth=0". Did you mean to CSS.escape it?
  51 |   ]);
  52 | 
  53 |   await fileChooser1.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\Trainee_Software_Tester_Job_Description 2.pdf']);
  54 |   expect(await page.locator('button[aria-label="Remove file"]').count()).toBe(2);
  55 | 
  56 | 
  57 | 
  58 | 
  59 | 
  60 | 
  61 | })
  62 | 
```