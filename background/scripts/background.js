//chromeとbrowserの名前空間対策
if (!("browser" in window)) {
    window.browser = chrome;
}

// function sendSearchMessage(tabs) {
//     let target = "";
//     target = localStorage.getItem('target');

//     browser.tabs.sendMessage(tabs[0].id, { command: "search", target: target });
// }

// function sendClearMessage(tabs) {
//     browser.tabs.sendMessage(tabs[0].id, { command: "clear" });
// }


// function ActionByHighlightStatus() {
//     let highlightStatus = localStorage.getItem('highlight');
//     if (highlightStatus === 'true') {
//         browser.tabs.query({ active: true, currentWindow: true }, sendSearchMessage);
//     }
//     else {
//         browser.tabs.query({ active: true, currentWindow: true }, sendClearMessage);
//     }
// }

// browser.runtime.onMessage.addListener(function (message) {
//     if (message.command === 'highlightOnLoad') {
//         ActionByHighlightStatus();
//     }
// });

// function tabOnActivated(e) {
//     ActionByHighlightStatus();
// }
// browser.tabs.onActivated.addListener(tabOnActivated);
