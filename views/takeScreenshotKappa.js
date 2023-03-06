import puppeteer from 'puppeteer';

async function takeScreenshot(tokenId) {
  // Launch a headless browser
  const browser = await puppeteer.launch({ headless: true });

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('localhost:8000/temp_1');

  await new Promise(resolve => setTimeout(resolve, 2000));

  // Take a screenshot of the page
  await page.screenshot({ path: 'screenshot.png' });

  // Close the browser
  await browser.close();
}

export {takeScreenshot}