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
        const blob = new Blob(chunks, { 'type': 'audio/wav' });
        const audioURL = URL.createObjectURL(blob);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = audioURL;
        downloadLink.download = 'recorded_audio.wav';
        downloadLink.click();
        
        // Clean up resources
        URL.revokeObjectURL(audioURL);
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
    // Check if the 'u' key is pressed
    if (event.key === 'r' && event.ctrlKey === true) {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            stopRecording();
        } else {
            startRecording();
        }
    }
}
