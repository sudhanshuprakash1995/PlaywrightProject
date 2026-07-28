import { test, expect } from '@playwright/test'
import stringSimilarity from 'string-similarity';
import { locators } from '../locators/locators.js';
import { KaiChatBot } from '../pageObjects/KaiChatBot.js';


test('login test and basic prompt tests', async ({ browser }) => {
  const context = await browser.newContext({ storageState: "auth.json" })
  const page = await context.newPage()

  // --- Login ---
  const url = 'https://kai.kumaran.com/chatbot'   // prod url
  // const url = 'https://kai-uat.kumaran.ai/chatbot'  // uat url
  
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.locator('button.login-button').click()
 
  await page.locator('div.toast.success').waitFor({ state: 'visible', timeout: 10000 });

  const kai = new KaiChatBot(page)
  // Optional: Close tour button
  // await page.pause()
  await kai.closeTour()
  /*
  try {
    const closeTourButton = page.locator('button[aria-label="Close Tour"]')
    await closeTourButton.waitFor({ state: 'visible', timeout: 10000 })
    await closeTourButton.click()
  } catch {
    // Tour not shown, continue
  }
  */
  
  // --- Verify Login ---
  await expect(page.locator('div.user-email')).toHaveText('sudhanshu.prakash@kumaran.com', { timeout: 5000 })

  // --- Select Model ---
  // await page.getByText('New Chat').click()
  // await page.locator('div#tour-model-selector').click()
  // const agentOptions = page.locator('div.options').first()
  // await agentOptions.getByText('claude-sonnet-4.6').click()
  await kai.selectModel('claude-sonnet-4.6',page);

  // await page.pause()
  // --- Basic Prompt Test ---
  await page.locator('textarea#chatInput').fill('Hi')
  await page.locator('button.send-action-btn').first().click()
  await page.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 15000 })

  const reply = page.locator('div.bot-content').last()
  console.log('Bot reply:', await reply.textContent())
  await expect(reply).toHaveText(/Hi|hello|Welcome|Assist/i)

  // --- General knowledge Test (new tab reuse session) ---
  const newPage = await page.context().newPage()
  const kaiNew = new KaiChatBot(newPage)
  
  await newPage.goto(url)
  await newPage.locator('textarea#chatInput').waitFor({ state: 'visible', timeout: 10000 })
  await kaiNew.selectModel('claude-opus-4.6');
  // await newPage.pause()
  await newPage.locator('textarea#chatInput').fill('What is the capital of Nepal')
  await newPage.locator('button.send-action-btn').first().click()
  await newPage.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 20000 })

  // const reply1 = newPage.locator('div.bot-content').last()
  const reply1 = await kaiNew.getReply(0,15000)
  console.log('###Bot first reply:', await reply1.textContent())
  const actual = await reply1.textContent()
  await expect(reply1).toHaveText(/Kathmandu/i)

// --- Current + Typo Test (reuse session) ---  
  await newPage.locator('textarea#chatInput').fill('wat is curent yer')
  await newPage.locator('button.send-action-btn').first().click()
  await newPage.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 15000 })
  // const reply2 = await newPage.locator('div.bot-content').nth(1)
  const reply2 = await kaiNew.getReply(1,20000)
  console.log('###Bot second reply:', await reply2.textContent({ timeout: 20000 }))
  const currentYear = new Date().getFullYear();
  await expect(reply2).toHaveText(new RegExp(currentYear.toString(), 'i'));

// --- Bad Input Test (reuse session) ---  

  await newPage.locator('textarea#chatInput').fill('dfsdfsdfs')
  await newPage.locator('button.send-action-btn').first().click()
  await newPage.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 20000 })
  // div.is-generating-status
  // const reply3 = await newPage.locator('div.bot-content').nth(1)
  const reply3 = await kaiNew.getReply(2,15000)
  console.log('###Bot third reply:', await reply3.textContent({ timeout: 20000 }))
  await expect(reply3).toHaveText(/Clarification|clarify|specific|random|typo/i)

  // --- File upload (reuse session) --- 
  await page.bringToFront()
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('button[id="tour-file-upload"]').click() // your upload button
  ]);

  await fileChooser.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\download.xlsx','C:\\Users\\SudhanshuPrakash\\Downloads\\robot_python.pdf']);

  // await page.pause()

  // await page.setInputFiles('button[id="tour-file-upload"]', 'C:\\Users\\SudhanshuPrakash\\Downloads\\download.xlsx');

  // Optional: verify file is attached
  const files = await page.locator('div.file-preview-chip').count()
  expect(files).toBe(2)





  // await newPage.locator('textarea#chatInput').fill('dfsdfsdfs')
  // await newPage.locator('button.send-action-btn').first().click()
  // await newPage.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 20000 })

  // const reply2 = newPage.locator('div.bot-content').last()
  // console.log('Bot second reply:', await reply2.textContent())
  // await expect(reply2).toHaveText(/Clarification|clarify|accident/i)


})

/*
import { test, expect, request } from '@playwright/test'



test('login test and basic prompt tests', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('https://kai.kumaran.com/chatbot')
  await page.waitForLoadState('networkidle')
  // await page.pause()
  await page.locator('button.login-button').click()
  await page.getByPlaceholder('Email or phone').fill('sudhanshu.prakash@kumaran.com')
  await page.locator('input#idSIButton9').click()
  // await page.waitForTimeout(2000)
  await page.pause()
  // await page.getByPlaceholder('Password').pressSequentially('Sp@123456')

  await page.getByRole('button', { name: 'Sign in' }).click()
  const staySignedInHeading = await page.getByRole('heading', { name: 'Stay signed in?' })
  if (staySignedInHeading.waitFor({ state: 'visible', timeout: 15000 })) {
    await page.locator('input#idSIButton9').click()
  }
  

const closeTourButton = page.locator('button[aria-label="Close Tour"]');
await closeTourButton.waitFor({ state: 'visible', timeout: 15000 })
await closeTourButton.click()


  await expect(page.locator('div.user-email')).toHaveText('sudhanshu.prakash@kumaran.com', { timeout: 5000 })
  await page.getByText('New Chat').click()
  // await page.pause()
  await page.locator('div#tour-model-selector').click()
  const agentOptions = await page.locator('div.options').first()
  await agentOptions.getByText('claude-sonnet-4.6').click()
  
  await page.locator('textarea#chatInput').fill('Hi')
  await page.locator('button.send-action-btn').first().click()
  // await page.pause()
  // await page.waitForSelector('div.bot-content', { timeout: 15000 })
  await page.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 15000 })
  const reply = await page.locator('div.bot-content').last()
  console.log('Bot reply:', reply)
  await expect(reply).toHaveText(/Hi|hello/i)
  const newPage = await page.context().newPage()
  await newPage.goto('https://kai.kumaran.com/chatbot')
  await newPage.waitForLoadState('networkidle')
  // await newPage.pause()
  await newPage.locator('textarea#chatInput').fill('dfsdfsdfs')
  await newPage.locator('button.send-action-btn').first().click()
  await newPage.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 15000 })
  const reply2 = await newPage.locator('div.bot-content').last()
  console.log('Bot second reply:', reply2)
  await expect(reply2).toHaveText(/Clarification|clarify/i)
})

*/
