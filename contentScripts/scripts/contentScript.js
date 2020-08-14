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
        console.log('complete');
        let bodyElem = document.getElementsByTagName("body")[0];
        // console.log(bodyElem.innerHTML);

        let inputElem = document.querySelector("input[name='q']");
        if (inputElem == null)
            return;

        let searchText = inputElem.value;
        // console.log(searchText);

        //Extract strings surrounded by `"`.
        let quotedString = ExtractQuotedString(searchText);
        Highlight(quotedString);
    }
}
window.addEventListener("load", initOnLoadCompleted, false);

function ExtractQuotedString(inputText) {
    let reQuotedWord = /\".+?\"/gi;

    let result = "";
    //Get quoted string
    while ((m = reQuotedWord.exec(inputText)) != null) {
        let quotedWord = m[0];
        result += " ";
        result += quotedWord;
    }

    return result;
}