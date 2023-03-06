import puppeteer from 'puppeteer';
import Jimp from 'jimp';

async function takeScreenshot(tokenId) {
  // Launch a headless browser
  const browser = await puppeteer.launch({ 
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ] ,
    headless: true });

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto(`https://blocktestkappa.herokuapp.com/temp_${tokenId}`);

  await new Promise(resolve => setTimeout(resolve, 1500));

  // Take a screenshot of the page
  await page.screenshot({ path: `${tokenId}_uncropped.png` });
  await new Promise(resolve => setTimeout(resolve, 1500));
  await cropImage(`${tokenId}_uncropped.png` , `${tokenId}.png` , 0, 0, 500, 500);
 
  // Close the browser
  await browser.close();
}

async function cropImage(inputPath, outputPath, x, y, width, height) {
  // Load the image using Jimp
  const image = await Jimp.read(inputPath);

  // Crop the image
  image.crop(x, y, width, height);

  // Save the cropped image
  await image.writeAsync(outputPath);
}

export {takeScreenshot};