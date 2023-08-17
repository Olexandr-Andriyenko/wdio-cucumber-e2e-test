import { Given, When, Then } from '@wdio/cucumber-framework';
import chai from 'chai';

Given(/^Google page is opened$/, async function () {
  console.log('Before opening the browser...');
  await browser.url('https://www.google.de/');
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
  await browser.waitUntil(async function () {
    return (
      (await browser.getTitle()) ===
        'WebdriverIO · Test-Framework für Browser und mobile Automatisierung der nächsten Generation für Node.js | WebdriverIO',
      {
        timeout: 20000,
        interval: 500,
        timeoutMsg: `Failed loading WDIO web page: ${await browser.getTitle()}`,
      }
    );
  });
  let url = await browser.getUrl();
  // Compare the URL
  chai.expect(url).to.equal(expectedURL);
});

/**
 * Web Interactions
 */
Given(/^A web page is opened$/, async function () {
  // Open webpage
  // await browser.url('/inputs'); // Leave blank because baseURL is set (wdio.conf.ts)
  // await browser.url('/dropdown');
  // await browser.url('/checkboxes');
  // await browser.url('/windows');
  // await browser.url('/javascript_alerts');
  // await browser.url('/upload');
  // await browser.url('/frames');
  await browser.url('https://www.google.de/');

  // Wait 15s before telling "can't find element" and 10s before "can't open page"
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});

When(/^Perfom web interactions$/, async function () {
  // --------------------------------------------------- //
  /**
   * 1. Input box
   * Actions:
   * a) Type into input box
   * b) Clear the field or just add value
   * c) Click and type "ele.click()"
   * d) Slow typiing
   */
  //   const num: number = 12345;
  //   const numStr: string = num.toString();
  //   let ele = await $(`[type="number"]`);
  //   // Step a) and b)
  //   await ele.setValue(num); // Clears value before seting (addValue() doesn't clear)
  //   // Step c)
  //   await ele.click();
  //   // Step d) Slow typiing
  //   for (let i = 0; i < numStr.length; i++) {
  //     let charStr = numStr.charAt(i);
  //     await browser.pause(1000);
  //     await browser.keys(charStr);
  //   }
  // --------------------------------------------------- //
  /**
   * 2. Dropdown
   * a) Assert default option is selected
   * b) Select by attribute, text, index
   * c) Get a list of options
   */
  // Step a)
  // let ele = await $('//select/option[@selected="selected"]');
  // let val = await ele.getText();
  // chai.expect(val).to.equal('Please select an option');
  // Step b)
  // let ddEle = await $('#dropdown');
  // await ddEle.selectByVisibleText('Option 2');
  // Step c)
  // let arr = [];
  // let eleArr = await $$('//select/option');
  // for (let i = 0; i < eleArr.length; i++) {
  //   let ele = eleArr[i];
  //   let val = await ele.getText();
  //   arr.push(val);
  //   console.log(val);
  // }
  // console.log(`Options Array: ${arr}`);
  // --------------------------------------------------- //
  /**
   * 3. Checkboxes
   * a) Select an option
   * b) Unselect an option (if selected)
   * c) Assert if option is selected
   * d) Select all options
   */
  // let ele = await $(`(//input[@type='checkbox'])[2]`);
  // let isChecked = await ele.isSelected();
  // chai.expect(isChecked).to.be.true;
  // --------------------------------------------------- //
  /**
   * 4. Windows handling
   * a) Launch the browser
   * b) Open antoher windows
   * c) Switch to the windows based on title
   * d) Switch back to the main window
   * METHODS USED:
   * a) getTitle()
   * b) getWindowHandle()
   * c) getWindowHandles()
   * d) switchToWindow()
   */
  // Open new windows
  // await $('=Click Here').click();
  // await $('=Elemental Selenium').click();
  // let currentWinTitle = await browser.getTitle();
  // let parentWinHandle = await browser.getWindowHandle();
  // console.log(`>>currentWinTitle: ${currentWinTitle}`);
  // // Switch to specific window
  // let winHandles = await browser.getWindowHandles();
  // for (let i = 0; winHandles.length; i++) {
  //   console.log(`>>winHandle: ${winHandles[i]}`);
  //   await browser.switchToWindow(winHandles[i]);
  //   currentWinTitle = await browser.getTitle();
  //   if (currentWinTitle === 'Elemental Selenium | Elemental Selenium') {
  //     await browser.switchToWindow(winHandles[i]);
  //     let headerTxtEleSel = await $(`<h1>`).getText();
  //     console.log(`headerTxtEleSel: ${headerTxtEleSel}`);
  //     // Rest of the actions here...
  //     break;
  //   }
  // }
  // // Switch back to parent window
  // await browser.switchToWindow(parentWinHandle);
  // let parentWinHeaderTxt = await $(`<h3>`).getText();
  // console.log(`>>parentWinHeaderTxt: ${parentWinHeaderTxt}`);
  // // Continue with rest of the execution
  /**
   * 4. Handling alerts
   * a) isAlertOpen()
   * b) acceptAlert()
   * c) dismissAlert()
   * d) getAlertText()
   * e) sendAlertText()
   */
  // console.log('Click on first alert:');
  // await $(`button=Click for JS Alert`).click();
  // if (await browser.isAlertOpen()) {
  //   await browser.acceptAlert();
  // }
  // console.log('Pause 3 seconds');
  // await browser.pause(3000);
  // console.log('Click on second alert:');
  // await $(`button=Click for JS Confirm`).click();
  // if (await browser.isAlertOpen()) {
  //   await browser.dismissAlert();
  // }
  // console.log('Pause 3 seconds');
  // await browser.pause(3000);
  // console.log('Click on third alert:');
  // await $(`button=Click for JS Prompt`).click();
  // if (await browser.isAlertOpen()) {
  //   let alertText = await browser.getAlertText();
  //   console.log(`alertText: ${alertText}`);
  //   await browser.sendAlertText('Hello I am Olexandr!');
  //   await browser.acceptAlert();
  // }
  /**
   * 5. File upload
   */
  // // console.log(process.cwd());  // To get the absolute path...
  // await $(`#file-upload`).addValue(
  //   `${process.cwd()}/data/fileupload/dummy.txt`
  // );
  // await $(`#file-submit`).click();
  /**
   * 6. Frames
   */
  // await $(`=iFrame`).click();
  // // Switch to frame
  // let eleFrame = await $(`#mce_0_ifr`);
  // await browser.switchToFrame(eleFrame);
  // // Interaction with frame...
  // await browser.pause(1000);
  // await $(`#tinymce`).setValue('Typing into a frame...');
  // // Select all and delete
  // await $(`#tinymce`).click();
  // await browser.keys(['Meta', 'A']);
  // await browser.pause(2000);
  // await browser.keys('Delete');
  // await browser.switchToParentFrame();
  /**
   * 7. Basic scrolling
   * a) scrollIntoView()
   */
  //   (await $(`a[href="/key_presses"]`)).scrollIntoView();
  //   await browser.debug();
  /**
   * 8. Web table:
   * a) Check number of rows and colums
   * b) Check whole table data
   * c) Get single row (based on condition)
   * d) Get single column
   * e) Get single cell value (based on antoher cell)
   */
  // a) Check number of rows and colums
  //   let rowCount = await $$('//body[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr')
  //     .length;
  //   chai.expect(rowCount).to.equal(4);
  //   console.log(`Number of rows: ${rowCount}`);
  //   let columnCount = await $$('//table[@id="table1"]//th').length;
  //   chai.expect(columnCount).to.equal(6);
  //   console.log(`Number of columns: ${columnCount}`);
  //   // b) Check whole table data
  //   let arr = [];
  //   for (let i = 1; i <= rowCount; i++) {
  //     let personObj = {
  //       lastName: '',
  //       firstName: '',
  //       email: '',
  //       due: '',
  //       web: '',
  //     };
  //     for (let j = 1; j <= columnCount; j++) {
  //       let cellValue = await $(
  //         `//body[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[${i}]/td[${j}]`
  //       ).getText();
  //       // For debug
  //       // console.log(`Cell value: ${cellValue}`);
  //       if (j === 1) personObj.lastName = cellValue;
  //       if (j === 2) personObj.firstName = cellValue;
  //       if (j === 3) personObj.email = cellValue;
  //       if (j === 4) personObj.due = cellValue;
  //       if (j === 5) personObj.web = cellValue;
  //     }
  //     arr.push(personObj);
  //   }
  //   console.log(`Whole table: ${JSON.stringify(arr)}`);
  // c) Get single row (based on condition)
  //   let rowCount = await $$('//body[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr')
  //     .length;
  //   chai.expect(rowCount).to.equal(4);
  //   console.log(`Number of rows: ${rowCount}`);
  //   let columnCount = await $$('//table[@id="table1"]//th').length;
  //   chai.expect(columnCount).to.equal(6);
  //   console.log(`Number of columns: ${columnCount}`);
  //   // b) Check whole table data
  //   let arr = [];
  //   for (let i = 1; i <= rowCount; i++) {
  //     let personObj = {
  //       lastName: '',
  //       firstName: '',
  //       email: '',
  //       due: '',
  //       web: '',
  //     };
  //     for (let j = 1; j <= columnCount; j++) {
  //       let cellValue = await $(
  //         `//body[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[${i}]/td[${j}]`
  //       ).getText();
  //       let firstName = await $(
  //         `//body[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[2]`
  //       ).getText();
  //       if (cellValue === 'Jason') {
  //         if (j === 1) personObj.lastName = cellValue;
  //         if (j === 2) personObj.firstName = cellValue;
  //         if (j === 3) personObj.email = cellValue;
  //         if (j === 4) personObj.due = cellValue;
  //         if (j === 5) personObj.web = cellValue;
  //       }
  //     }
  //     if (personObj.firstName) {
  //       arr.push(personObj);
  //     }
  //   }
  //   console.log(`Whole table: ${JSON.stringify(arr)}`);
  // d) Get single column
  //   let rowCount = await $$('//body[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr')
  //     .length;
  //   chai.expect(rowCount).to.equal(4);
  //   console.log(`Number of rows: ${rowCount}`);
  //   let columnCount = await $$('//table[@id="table1"]//th').length;
  //   chai.expect(columnCount).to.equal(6);
  //   console.log(`Number of columns: ${columnCount}`);
  //   let arr = [];
  //   for (let i = 1; i <= rowCount; i++) {
  //     let cellValue = await $(
  //       `//body[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[${i}]/td[4]`
  //     ).getText();
  //     arr.push(cellValue);
  //   }
  //   console.log(arr);
  // e) Get single cell value (based on antoher cell)
  //   let rowCount = await $$('//body[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr')
  //     .length;
  //   chai.expect(rowCount).to.equal(4);
  //   console.log(`Number of rows: ${rowCount}`);
  //   let columnCount = await $$('//table[@id="table1"]//th').length;
  //   chai.expect(columnCount).to.equal(6);
  //   console.log(`Number of columns: ${columnCount}`);
  //   let arr = [];
  //   for (let i = 1; i <= rowCount; i++) {
  //     //   let cellValue = await $(
  //     //     `//body[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[${i}]/td[${j}]`
  //     //   ).getText();
  //     let price = await $(
  //       `//body[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[${i}]/td[4]`
  //     ).getText();
  //     let firstName = await $(
  //       `//body[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[${i}]/td[2]`
  //     ).getText();
  //     if (+price.replace('$', '') > 50) {
  //       arr.push(firstName);
  //     }
  //   }
  //   console.log(arr);

  /**
   * 9. Advanced scrolling
   * VISIBLE PORTION
   * windows object:
   * Y -> [-]window.innerHeight
   */

  // Scroll down
  await browser.execute(() => {
    window.scrollBy(0, window.innerHeight);
  });
  // Scroll up
  await browser.pause(2000);
  await browser.execute(() => {
    window.scrollBy(0, -window.innerHeight);
  });

  // INVISIBLE PORTION
  // window object:
  // scroll.To
  await browser.pause(2000);
  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await browser.pause(2000);

  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollTop);
  });
  await browser.debug();
});
