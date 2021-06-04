'use strict';

const { username, password, schoolName } = require('./config.json')
const { chromium } = require('playwright')
const axios = require('axios');

(async () => {
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage()
    // Login
    await page.goto('https://www.quill.org/session/new')
    await page.click('.auth-section > button:nth-child(2)')
    await page.click('.Autosuggest--textInput')
    await page.keyboard.type(schoolName, { delay: 50 })
    await page.waitForTimeout(1000)
    await page.keyboard.press('Enter')
    // Custom code for my school's sso solution
    await page.click('a.flexbox:nth-child(1)')
    await page.click('#userNameInput')
    await page.keyboard.type(username)
    await page.keyboard.press('Tab')
    await page.keyboard.type(password)
    await page.keyboard.press('Enter')
    // Subscribe to http responses to get question data
    page.on('response', response => {
        if (response.url().includes('responses')) {
            axios.get(response.url())
                .then(function (response) {
                    page.click('#main-content > div > section > div.student-container.student-container-diagnostic > div > div > div.content > div.student.text-editor.card.is-fullwidth > div > div > div')
                    for (let answerBlob in response.data) {
                        // Check if answer is correct
                        if (response.data[answerBlob].optimal) {
                            console.log(response.data[answerBlob].text)
                            // Fix weird behavior whene only first character of text is typed
                            page.keyboard.type(' ' + response.data[answerBlob].text, { delay: 50 })
                            page.keyboard.press('Enter')
                            break
                        }
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    });
})();