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
            case 'toggle-highlight-on-googlesearch':
                chrome.storage.local.get("IsHighlightOnSearchEnabled", function (result) {
                    let isHighlightOnSearchEnabled = result.IsHighlightOnSearchEnabled;
                    if (isHighlightOnSearchEnabled) {
                        let inputElem = document.querySelector("input[name='q']");
                        if (inputElem == null)
                            return;

                        let searchText = inputElem.value;

                        //Extract strings surrounded by `"`.
                        let quotedString = ExtractQuotedString(searchText);
                        Highlight(quotedString);
                        IsHighlight = true;
                    }
                    else {
                        Highlight("");
                        IsHighlight = false;
                    }
                });
                break;
        }
    });

    //highlight after loadcompleted
    //this must be executed after the window is fully loaded
    if (document.readyState === 'complete') {
        chrome.storage.local.get("IsHighlightOnSearchEnabled", function (result) {
            let isHighlightOnSearchEnabled = result.IsHighlightOnSearchEnabled;

            //"Highlight on Google Search" has priority over "Auto highlight". 
            if (isHighlightOnSearchEnabled == false) {
                AutoHighlight();
            }
            else {
                let inputElem = document.querySelector("input[name='q']");
                if (inputElem == null) {
                    AutoHighlight();
                }
                else {
                    let searchText = inputElem.value;

                    //Extract strings surrounded by `"`.
                    let quotedString = ExtractQuotedString(searchText);
                    Highlight(quotedString);
                    IsHighlight = true;
                }
            }
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

function AutoHighlight() {
    chrome.storage.local.get("IsAutoHighlightEnabled", function (result) {
        let isAutoHighlightEnabled = result.IsAutoHighlightEnabled;

        if (isAutoHighlightEnabled == false)
            return;

        chrome.storage.local.get("target", function (result) {
            let inputText = result.target;
            if (typeof inputText === "undefined")
                return;

            Highlight(inputText);
            IsHighlight = true;
        });
    });
}