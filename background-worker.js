try {
    importScripts("src/inject/inject.js");
} catch (e) {
    console.error(e);
}

chrome.webRequest.onCompleted.addListener(function (responseHeaders) {
    console.log(responseHeaders)
});

// chrome.runtime.sendMessage({ quillSessionId: sessionId })