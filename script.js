// visualizer.js
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

// Set canvas size to full window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Audio context and analyzer
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256; // Adjust for more/less detail

// Get microphone input
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    visualize();
  })
  .catch(err => console.error('Microphone access denied:', err));

function visualize() {
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
    requestAnimationFrame(draw); // Loop
    analyser.getByteFrequencyData(dataArray);

    // Clear canvas
    ctx.fillStyle = 'rgb(0, 255, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw bars
    const barWidth = (canvas.width / bufferLength) * 0.4;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] / 2;
    barHeight = dataArray[i];

    // Set color and draw bar
    ctx.fillStyle = `rgb(${barHeight + 100}, 50, 200)`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 10; // Spacing between bars
    }
}

draw();
}