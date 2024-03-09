console.log("Parser.js is running");
function containsHTMLElement(text) {
  var regex = /<[^>]+>/;
  return regex.test(text);
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

elements.forEach(function (element) {
  element.addEventListener('keyup', function(e) {
    var code = e.code;
    if (code === 'Tab') {
        // console.log(e.target);
        let parsed = parserHTML(e.target);
        console.log(parsed);
        text2speech({"inputs": parsed}).then((response) => {
          var url = URL.createObjectURL(response);
          var a = new Audio(url);
          a.play();
      });
    }
});
});

function parserHTML(element) {
    // let a = new Audio(chrome.runtime.getURL('recordings/Generating.mp3'))
    // a.play()
    switch (element.tagName.toLowerCase()) {
      case 'img':
        return parseIMG(element);
      case 'source':
        return 'This is a source tag for image';
      case 'path':
        return parseIMG(element);
      case 'rect':
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


function parseButton(element) {
  let innerHTML;

  if (element.innerHTML && element.innerHTML.trim() !== null && containsHTMLElement(element.innerHTML) === false){
    innerHTML = element.innerHTML;
  }

  if (innerHTML !== undefined) {
    return 'This is a button with text "' + innerHTML + '"';
  }

  return 'Cautious! This button has no text'
}

function parseIMG(element) {
  let alt;

  if ( element.getAttribute('alt') && element.getAttribute('alt').trim() !== null) {
    alt = element.getAttribute('alt');
  }

  if (alt !== undefined) {
    return 'This is an image which is about "' + alt + '"';
  }

  return 'This image has no description'
}


function parseText(element) {
  let innerHTML;

  if (element.innerHTML && element.innerHTML.trim() !== null && containsHTMLElement(element.innerHTML) === false){
    innerHTML = element.innerHTML;
  }

  if (innerHTML !== undefined) {
    return 'This is text "' + innerHTML + '"';
  }

  return 'This is empty text'
}

function parseA(element) {
  let href, innerHTML;

  if (element.getAttribute('href') && element.getAttribute('href').trim() !== null) {
    href = element.getAttribute('href');
  }

  if (element.innerHTML && element.innerHTML.trim() !== null && containsHTMLElement(element.innerHTML) === false){
    innerHTML = element.innerHTML;
  } else if (element.innerHTML && element.innerHTML.trim() !== null && containsHTMLElement(element.innerHTML) === true){
    innerHTML = 'HTML content';
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


async function text2speech(data) {
  const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/mms-tts-eng",
      {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify(data),
      }
  );

      const result = await response.blob();
      return result;
  }