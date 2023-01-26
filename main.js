import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from 'express';
console.log("gisleiangelo@gmail.com"); // remove this after you've confirmed it is working

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const screenshot = 'forlev.png';

  await page.goto('https://fortlevsolar.app');
  
  // Type into search box.
//  await page.waitForNavigation()
  await page.focus('[aria-label="E-mail"]')
  await page.keyboard.type(process.env.FORTLEV_USER, {delay: 50}); //process.env.FORTLEV_LOGIN);
  await page.focus('[aria-label="Senha"]')
  await page.keyboard.type(process.env.FORTLEV_PASSWORD, {delay: 50}); //process.env.FORTLEV_LOGIN);
//  await page.type('[aria-label="E-mail"]', "teste"); //process.env.FORTLEV_LOGIN);
//  await page.type('[aria-label="Senha"]', "testepwor");//process.env.FORTLEV_PASSWORD);
  await page.click('button');
  await page.waitForNavigation()
  await page.goto('https://fortlevsolar.app/catalog')
  await page.waitForNavigation()
  await page.screenshot({ path: screenshot })
  await browser.close();

  // Wait for suggest overlay to appear and click "show all results".
/*  const allResultsSelector = '.q-field__native q-placeholder';
  await page.waitForSelector(allResultsSelector);

  // Wait for the results page to load and display the results.
  const resultsSelector = '.gsc-results .gs-title';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const links = await page.evaluate(resultsSelector => {
    return [...document.querySelectorAll(resultsSelector)].map(anchor => {
      const title = anchor.textContent.split('|')[0].trim();
      return `${title} - ${anchor.href}`;
    });
  }, resultsSelector);

  // Print all the files.
  console.log(links.join('\n'));

  await browser.close();
  */
})();