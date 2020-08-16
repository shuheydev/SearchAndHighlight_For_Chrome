//chromeとbrowserの名前空間対策
if (!("browser" in window)) {
    window.browser = chrome;
}

var IsHighlight = false;

//EventHandler when page loaded.
function initOnLoadCompleted(e) {
    //add handler to event that receive message from popup page.
    browser.runtime.onMessage.addListener((message) => {
        switch (message.command) {
            case 'search'://'search' button clicked.
                Highlight(message.target);
                IsHighlight = true;
                break;
            case 'clear'://'clear' button clicked.
                Highlight("");
                IsHighlight = false;
                break;
            case 'toggle'://'Shif+Alt+L'Shortcut
                if (IsHighlight) {
                    Highlight("");
                    IsHighlight = false;
                }
                else {
                    Highlight(message.target);
                    IsHighlight = true;
                }
                break;
        }
    });

    //highlight after loadcompleted
    //this must be executed after the window is fully loaded
    if (document.readyState === 'complete') {
        chrome.storage.local.get("IsAutoHighlightEnabled", function (result) {
            let isAutoHighlightEnabled = result.IsAutoHighlightEnabled;

            if (isAutoHighlightEnabled == false)
                return;

            chrome.storage.local.get("target", function (result) {
                let inputText = result.target;
                if (typeof inputText === "undefined")
                    return;

                Highlight(inputText);
            });
        });
    }
}
window.addEventListener("load", initOnLoadCompleted, false);

function ExtractQuotedString(inputText) {
    let reQuotedWord = /\".+?\"/gi;

    let result = "";
    //Get quoted string
    while ((m = reQuotedWord.exec(inputText)) != null) {
        let quotedWord = m[0];
        result += quotedWord;
        result += " ";
    }

    return result;
}