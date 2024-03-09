let mediaRecorder;
let chunks = [];

async function startRecording() {
    console.log('start recording');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
        chunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { 'type': 'mp3' });
        speech2text(blob).then((result) => {
            const number = result.text.match(/\d+/);
            console.log(number);
            if (number) {
                tabToIndex(number[0]);
            }
        });
        chunks = [];
    };
    mediaRecorder.start();
}

function stopRecording() {
    console.log('stop recording');
    mediaRecorder.stop();
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    if (event.key === 'z' && event.ctrlKey === true) {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            stopRecording();
        } else {
            startRecording();
        }
    }
}


async function speech2text(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/openai/whisper-large-v3",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: data,
		}
	);
	const result = await response.json();

	return result;
}


function tabToIndex(index) {
    const elementsWithTabIndex = document.querySelectorAll('[data-tabindex]');

    if (elementsWithTabIndex.length === 0) {
        console.log('No elements with tabindex');
        return;
    }

    const element = elementsWithTabIndex[index-1];

    if (element) {
        element.focus();
        let index = element.getAttribute('data-tabindex');
        let parsed = index + ": " +parserHTML(element);
        console.log(parsed);
        text2speech({"inputs": parsed}).then((response) => {
          var url = URL.createObjectURL(response);
          var a = new Audio(url);
          a.play();
      });
    }
}



function englishToNumber(text) {
    text.trim();
    switch (text.tolowercase()) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        case 'ten':
            return 10;
        case 'eleven':
            return 11;
        case 'twelve':
            return 12;
        case 'thirteen':
            return 13;
        case 'fourteen':
            return 14;
        case 'fifteen':
            return 15;
        case 'sixteen':
            return 16;
        case 'seventeen':
            return 17;
        case 'eighteen':
            return 18;
        case 'nineteen':
            return 19;
        case 'twenty':
            return 20;
        default:
            return 1;
    }
}