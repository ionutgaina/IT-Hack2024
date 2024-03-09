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
            console.log(result);
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
    
    console.log(result);
	return result;
}
