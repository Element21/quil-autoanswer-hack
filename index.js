const { chromium } = require('playwright');
const axios = require('axios');

let answerCount = 1;

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  const usernameDropdownLocator = '#nav-user-dropdown > span';
  page.setDefaultTimeout(0);
  page.setDefaultNavigationTimeout(0);

  // Login
  await page.goto('https://www.quill.org/session/new');
  console.log('Please signin to continue');
  await page.waitForSelector(usernameDropdownLocator);
  const name = await page.locator(usernameDropdownLocator).textContent();
  console.log(`Login succesful! Welcome, ${name.trim()}!\n`);

  // Subscribe to http responses to get question data
  page.on('response', (response) => {
    if (response.url().includes('responses')) {
      axios.get(response.url())
        .then((r) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const answerBlob in r.data) {
            // Check if answer is correct
            if (r.data[answerBlob].optimal) {
              console.log(`Answer ${answerCount}: ${r.data[answerBlob].text}`);
              answerCount += 1;
            }
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
  });
})();
