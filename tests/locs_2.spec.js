const { test, expect } = require('@playwright/test')
const { log } = require('console')

test('Frames', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
  // await page.goto('https://www.google.com/')
  // await page.goBack()
  // await page.goForward()

  await expect(page.locator('#displayed-text')).toBeVisible()
  await page.click('#hide-textbox')
  await expect(page.locator('#displayed-text')).toBeHidden()
  await page.pause()
  page.on('dialog', (dialog) => dialog.accept())
  await page.click('#confirmbtn')
  await page.locator('#mousehover').hover()
  const framesPage = page.frameLocator('#courses-iframe')
  framesPage.locator('li a[href*="lifetime-access"]:visible').click()
  const textCheck = await framesPage.locator('.text h2').textContent()
  console.log(textCheck.split(' ')[1])
})

test('Screenshot & Visual comparison', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
  await expect(page.locator('#displayed-text')).toBeVisible()
  await page
    .locator('#displayed-text')
    .screenshot({ path: 'partialScreenshot.png' })
  await page.locator('#hide-textbox').click()
  await page.screenshot({ path: 'screenshot.png' })
  await expect(page.locator('#displayed-text')).toBeHidden()
})

test('visual', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
 expect(await page.screenshot()).toMatchSnapshot('landing.png')
 
})
