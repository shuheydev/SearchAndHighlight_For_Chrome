
(function () {

    //chromeとbrowserの名前空間対策
    if (!("browser" in window)) {
        window.browser = chrome;
    }


    // function onSliderClick(e)
    // {
    //     if(e)
    //     {
    //         let target=e.target;

    //         if(target.hasAttribute('checked')){
    //             target.removeAttribute('checked');
    //             browser.tabs.query({ active: true, currentWindow: true },sendClearMessage);

    //             localStorage.setItem('highlight',false);
    //         }
    //         else
    //         {
    //             target.setAttribute('checked','');
    //             browser.tabs.query({ active: true, currentWindow: true },sendSearchMessage);

    //             localStorage.setItem('highlight',true);
    //         }
    //     }
    // }
    // let sliderCheckbox=document.querySelector('#checkBoxToggleHighlight');
    // sliderCheckbox.addEventListener('click',onSliderClick);


    // let highlightStatus=localStorage.getItem('highlight');
    // if(highlightStatus==='true')
    // {
    //     sliderCheckbox.setAttribute('checked','');

    // }
    // else
    // {
    //     sliderCheckbox.removeAttribute('checked');
    // }


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
        // .then(sendSearchMessage);
    });


    function sendClearMessage(tabs) {
        browser.tabs.sendMessage(tabs[0].id, { command: "clear" });
    }
    //Set Eventhandler to 'Search' button.
    let clearButton = document.querySelector("#buttonClear");
    clearButton.addEventListener('click', (e) => {
        browser.tabs.query({ active: true, currentWindow: true }, sendClearMessage);
        // .then(sendClearMessage);
    });

    // function ActionByHighlightStatus() {
    //     let highlightStatus = localStorage.getItem('highlight');
    //     if (highlightStatus === 'true') {
    //         browser.tabs.query({ active: true, currentWindow: true }, sendSearchMessage);
    //     }
    //     else {
    //         browser.tabs.query({ active: true, currentWindow: true }, sendClearMessage);
    //     }
    // }

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




