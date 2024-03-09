console.log("Background script running!");
chrome.commands.onCommand.addListener((command) => {
    console.log(command)

});