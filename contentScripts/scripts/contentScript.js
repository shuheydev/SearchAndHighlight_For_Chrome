//chromeとbrowserの名前空間対策
if (!("browser" in window)) {
    window.browser = chrome;
}


//EventHandler when page loaded.
function initOnLoadCompleted(e) {
    //add handler to event that receive message from popup page.
    browser.runtime.onMessage.addListener((message) => {
        switch (message.command) {
            case 'search'://'search' button clicked.
                Highlight(message.target);
                break;
            case 'clear'://'clear' button clicked.
                Highlight("");
                break;
        }
    });
}
window.addEventListener("load", initOnLoadCompleted, false);

