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
