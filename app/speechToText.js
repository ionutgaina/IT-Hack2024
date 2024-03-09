window.addEventListener('keydown', function (event) {
    console.log(event)
    if (event.ctrlKey && event.key === "r") {
        chrome.runtime.sendMessage({ action: "startCapture" }, function (response) {
            console.log(response)
        });
    }
});