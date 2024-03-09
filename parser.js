
function setTabIndexForLeafElements(element) {
  // Check if the element has any child elements
  if (element.children.length === 0) {
      // Set tabindex to 0 for leaf elements
      element.setAttribute('tabindex', '0');
  } else {
      // Recursively set tabindex for child elements
      var children = element.children;
      for (var i = 0; i < children.length; i++) {
          setTabIndexForLeafElements(children[i]);
      }
  }
}

setTabIndexForLeafElements(document.body);

var elements = document.querySelectorAll('body');

elements.forEach(function(element) {
    element.addEventListener('keyup', function(e) {
        var code = e.code;
        if (code === 'Tab') {
            console.log(e.target);
        }
    });
});