
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const progressBar = document.getElementById('progressBar');
const progressHandle = document.getElementById('progressHandle');
const progressContainer = document.getElementById('progressContainer');
const currentTimeEl = document.getElementById('currentTime');
const vinyl = document.getElementById('vinyl');
const totalTimeEl = document.getElementById('totalTime');

let isDragging = false;
let rotation = 0; // current rotation in degrees
let lastTime = 0;

// Format time as mm:ss
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return minutes > 0 ? `${minutes}min ${seconds}s`: `${seconds}s`;
}

// Load total duration
audio.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

// Update progress bar & handle while playing
audio.addEventListener('timeupdate', () => {
  if (!isDragging) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + '%';
    progressHandle.style.left = percent + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

audio.addEventListener('ended', () => {
    audio.currentTime = 0; // rewind to start
    audio.play();          // start again
  });

// Play / pause / restart
playBtn.addEventListener('click', () => audio.play());
pauseBtn.addEventListener('click', () => audio.pause());
restartBtn.addEventListener('click', () => {
  audio.currentTime = 0;
  audio.play();
});

// Drag logic
function updateByClickOrDrag(clientX) {
  const rect = progressContainer.getBoundingClientRect();
  let offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
  const percent = offsetX / rect.width;
  audio.currentTime = percent * audio.duration;
}

// Animation loop for spinning vinyl
function animateVinyl() {
    if (!isDragging && !audio.paused) {
      const delta = audio.currentTime - lastTime;
      rotation += delta * 360 / 10; // full spin every 10s
      vinyl.style.transform = `rotate(${rotation}deg)`;
      vinyl.style.filter = `hue-rotate(${rotation}deg)`;
    }
    lastTime = audio.currentTime;
    requestAnimationFrame(animateVinyl);
  }

progressHandle.addEventListener('mousedown', (e) => {
  isDragging = true;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const rect = progressContainer.getBoundingClientRect();
    let offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = offsetX / rect.width;
    progressBar.style.width = percent * 100 + '%';
    progressHandle.style.left = percent * 100 + '%';
    currentTimeEl.textContent = formatTime(percent * audio.duration);
  }
});

document.addEventListener('mouseup', (e) => {
  if (isDragging) {
    updateByClickOrDrag(e.clientX);
    isDragging = false;
    document.body.style.userSelect = '';
  }
});

// Allow click-to-seek
progressContainer.addEventListener('click', (e) => {
  updateByClickOrDrag(e.clientX);
});

animateVinyl();
