//chromeとbrowserの名前空間対策
if (!("browser" in window)) {
    window.browser = chrome;
}

window.addEventListener("load", initOnLoadCompleted, false);
function initOnLoadCompleted(e) {
    browser.runtime.onMessage.addListener((message) => {

        switch (message.command) {
            case 'search':
                highlight(message.target);
                break;
            case 'clear':
                highlight("");
                break;
        }
    });



    // //Send message to background page for highlight active page when the page loaded.
    // //It's fired at 500ms after load completed.
    // function sendHighlightOnLoadMessage() {
    //     browser.runtime.sendMessage({ command: 'highlightOnLoad' });
    // }
    // window.setTimeout(sendHighlightOnLoadMessage, 500);
}


