
// Set tabindex to 0 for all elements
function setTabIndex(element) {
  element.setAttribute('tabindex', '0');
  
  var children = element.children;
  for (var i = 0; i < children.length; i++) {
    setTabIndex(children[i]);
  }
}

setTabIndex(document.body);

var elements = document.querySelectorAll('body');

elements.forEach(function(element) {
    element.addEventListener('keyup', function(e) {
        var code = e.code;
        if (code === 'Tab') {
            console.log(e.target);
        }
    });
});