// Copyright (c) 2012 The Chromium Authors. All rights reserved.

/**
 * @filedescription Initializes the extension's background page.
 */

let nav = new NavigationCollector();

let eventList = ['onBeforeNavigate', 'onCreatedNavigationTarget',
  'onCommitted', 'onCompleted', 'onDOMContentLoaded',
  'onErrorOccurred', 'onReferenceFragmentUpdated', 'onTabReplaced',
  'onHistoryStateUpdated'];

eventList.forEach(function (event) {
  chrome.webNavigation[event].addListener(function (data) {
    if (typeof data)
      console.log(chrome.i18n.getMessage('inHandler'), event, data);
    else
      console.error(chrome.i18n.getMessage('inHandlerError'), event);
  });
});

// Reset the navigation state on startup. We only want to collect data within a
// session.
chrome.runtime.onStartup.addListener(function () {
  nav.resetDataStorage();
});

chrome.runtime.onMessage.addListener(function (message, sender) {
  console.log(`${sender}: ${message}`);
});