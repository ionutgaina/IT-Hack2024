window.addEventListener('focus', function() {
    var focusedElement = document.activeElement;

    parseHTML(focusedElement);
});

function parseHTML(element) {
    console.log(element.tagName);
}
