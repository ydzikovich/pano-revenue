let showMoney = document.getElementById('showMoney');


showMoney.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                file: 'contentScript.js'
            });
    });
};
