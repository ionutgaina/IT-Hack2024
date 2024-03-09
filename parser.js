
// Set tabindex to 0 for all elements
function setTabIndex(element) {
  element.setAttribute('tabindex', '0');
  
  var children = element.children;
  for (var i = 0; i < children.length; i++) {
    setTabIndex(children[i]);
  }
}

setTabIndex(document.body);
// end


var elements = document.querySelectorAll('body *');

var elements = document.querySelectorAll('body *');

elements.forEach(function(element) {
    element.addEventListener('keydown', function(e) {
      e.tabIndex = 0;
        var code = e.code;
        if (code === 'Tab') {
            e.preventDefault();
            var elem = element.activeElement;
            console.log(elem);
        }
    });
});