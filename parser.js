function containsHTMLElement(text) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(text, 'text/html');
  return doc.body.childElementCount > 0;
}

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
            console.log(parserHTML(e.target));
        }
    });
});

function parserHTML(element) {
  console.log("InnerHTML " + element.innerHTML);
  console.log("TagName " + element.tagName);
  console.log("Alt attribute " + element.getAttribute('alt'));

  if (element.tagName.toLowerCase() === 'a') {
    return parseA(element);
  }

  switch (element.tagName.toLowerCase()) {
    case 'img':
      return parseIMG(element);
    case 'input':
      return parseInput(element);
    case 'button':
      return parseButton(element);
    case 'a':
      return parseA(element);
    default:
      return parseText(element);
  }
}

function parseIMG(element) {
  let alt;

  if (element.getAttribute('alt').trim() !== null) {
    alt = element.getAttribute('alt');
  }

  if (alt !== undefined) {
    return 'This is an image which is about "' + alt + '"';
  }

  return 'This image has no description'
}


function parseText(element) {
  let innerHTML;

  if (element.innerHTML.trim() !== null && containsHTMLElement(element.innerHTML) === false){
    innerHTML = element.innerHTML;
  }

  if (innerHTML !== undefined) {
    return 'This is text "' + innerHTML + '"';
  }

  return 'This is empty text'
}

function parseA(element) {
  let href, innerHTML;

  if (element.getAttribute('href').trim() !== null) {
    href = element.getAttribute('href');
  }

  if (element.innerHTML.trim() !== null && containsHTMLElement(element.innerHTML) === false){
    innerHTML = element.innerHTML;
  }

  if (href === undefined && innerHTML !== undefined) {
    return 'This is a link with no reference and text "' + innerHTML + '"';
  } else if (href !== undefined && innerHTML === undefined) {
    return 'This is a link to "' + href + '"';
  } else if (href !== undefined && innerHTML !== undefined) {
    return 'This is a link to "' + href + '" with text "' + innerHTML + '"';
  }

  return 'This is empty link'
}