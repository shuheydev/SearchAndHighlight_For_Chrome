(function () {

    //chromeとbrowserの名前空間対策
    if (!("browser" in window)) {
        window.browser = chrome;
    }

    function sendSearchMessage(tabs) {

        let targetTextArea = document.querySelector("#textAreaTarget");
        let targetString = targetTextArea.value;

        localStorage.setItem('target', targetString);

        browser.tabs.sendMessage(tabs[0].id, { command: "search", target: targetString });
    }

    //Set Eventhandler to 'Search' button.
    let replaceButton = document.querySelector("#buttonSearch");
    replaceButton.addEventListener('click', (e) => {
        browser.tabs.query({ active: true, currentWindow: true }, sendSearchMessage);
    });


    function sendClearMessage(tabs) {
        browser.tabs.sendMessage(tabs[0].id, { command: "clear" });
    }
    //Set Eventhandler to 'Search' button.
    let clearButton = document.querySelector("#buttonClear");
    clearButton.addEventListener('click', (e) => {
        browser.tabs.query({ active: true, currentWindow: true }, sendClearMessage);
    });

    let textArea = document.querySelector("#textAreaTarget");
    textArea.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            browser.tabs.query({ active: true, currentWindow: true }, sendSearchMessage);
        }
    });

    //Restore previous input words to textarea when popup shown.
    let targetTextArea = document.querySelector("#textAreaTarget");
    targetTextArea.value = localStorage.getItem('target');
    targetTextArea.focus();

})();




