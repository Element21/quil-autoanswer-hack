console.log("I've Been Injected!")

// When we recive message from service worker with cookie, do juicy things
// // create dictionary to hold the api request headers
// let headers = {
//     "User-Agent": "Mozilla / 5.0(X11; Linux x86_64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 91.0.4472.77 Safari / 537.36",
//     "Accept-Language": "en-US,en;q=0.9",
//     "Cookie": sessionId
// };

// // Get classes
// let response = fetch('https://www.quill.org/students_classrooms_json', {
//     method: 'GET',
//     headers: JSON.stringify(headers)
// })
// // Sync our clients cookies with the cookies from the api response
// if (response.ok) { // if HTTP-status is 200-299
//     let classes = response.json();
//     console.log(classes)
// } else {
//     alert("HTTP-Error: " + response.status);
// }