/**
 * @filedescription This is the code that gets injected into the site
 */

function getCookie(domain, name, callback) {
    chrome.cookies.get({ "url": domain, "name": name }, function (cookie) {
        if (callback) {
            callback(cookie.value);
        }
    });
}

// Get current session id (changes on every api response)
let sessionId = chrome.cookies.get({ url: 'https://quill.org', name: '_quill_session' })

// create dictionary to hold the api request headers
let headers = {
    "User-Agent": "Mozilla / 5.0(X11; Linux x86_64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 91.0.4472.77 Safari / 537.36",
    "Accept-Language": "en-US,en;q=0.9",
    "Cookie": sessionId
};

// Get classes
fetch('https://www.quill.org/students_classrooms_json', {
    method: 'GET',
    headers: JSON.stringify(headers)
})
    // Sync our clients cookies with the cookies from the api response
    .then(JSON.stringify(response) => {
        response.cookie.forEach((cookie) => {
            chrome.cookie.set()
        })
            .then(data => console.log(data));
        console.log(response)