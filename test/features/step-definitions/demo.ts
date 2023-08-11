import { Given, When, Then } from '@wdio/cucumber-framework';
import chai from 'chai';

Given(/^Google page is opened$/, async function () {
  console.log('Before opening the browser...');
  await browser.url('https://www.google.de');
  await browser.pause(10000);
  console.log('After opening the browser...');
});

// function will recive (.*) as argument
When(/^Search with (.*)$/, async function (searchItem) {
  console.log(`>> searchItem ${searchItem}`);
  // Selector (name of search bar element at google page)
  let ele = await $(`[name=q]`);
  // Enter "wdio" inside the search bar (value recived by searchItem)
  await ele.setValue(searchItem);
  // Press "Enter" for searching
  await browser.keys('Enter');
});

Then(/^Click on first search result$/, async function () {
  // The first item is an h3 element, which will be selected firstly
  let ele = await $(`<h3>`);
  ele.click();
});

Then(/^URL should match (.*)$/, async function (expectedURL) {
  console.log(`>> expectedURL ${expectedURL}`);
  let url = await browser.getUrl();
  // Compare the URL
  chai.expect(url).to.equal(expectedURL);
});

/**
 * Web Interactions
 */
Given(/^A web page is opened$/, async function () {
  // Open webpage
  await browser.url('/inputs'); // Leave blank because baseURL is set (wdio.conf.ts)
  // Wait 15s before telling "can't find element" and 10s before "can't open page"
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});

When(/^Perfom web interactions$/, async function () {
  /**
   * 1. Input box
   * Actions:
   * a) Type into input box
   * b) Clear the field or just add value
   * c) Click and type "ele.click()"
   * d) Slow typiing
   */

  const num: number = 12345;
  const numStr: string = num.toString();
  let ele = await $(`[type="number"]`);
  // Step a) and b)
  await ele.setValue(num); // Clears value before seting (addValue() doesn't clear)
  // Step c)
  await ele.click();
  // Step d) Slow typiing
  for (let i = 0; i < numStr.length; i++) {
    let charStr = numStr.charAt(i);
    await browser.pause(1000);
    await browser.keys(charStr);
  }
  await browser.debug();
});
