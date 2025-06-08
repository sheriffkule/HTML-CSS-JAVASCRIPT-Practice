let songs = [];

const songList = document.querySelector('.song-list');
const playPauseButton = document.getElementById('play-pause');
const uploadButton = document.getElementById('upload-button');
const fileInput = document.getElementById('file-input');
const visualizer = document.querySelector('.visualizer');
const bars = document.querySelectorAll('.bar');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

let audioContext, analyser, source, dataArray;
let currentSongIndex = -1;
let isPlaying = false;
let currentAudio = null;

function initAudioContext() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  dataArray = new Uint8Array(analyser.frequencyBinCount);
}

function loadSongList() {
  songList.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.title;
    li.addEventListener('click', () => playSong(index));
    songList.appendChild(li);
  });
}

function playSong(index) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
    isPlaying = false;
    playPauseButton.textContent = 'Play';
  }
  currentSongIndex = index;
  const song = songs[index];

  currentAudio = new Audio(song.file);
  currentAudio.play();
  isPlaying = true;
  playPauseButton.textContent = 'Pause';

  if (!audioContext) initAudioContext();
  source = audioContext.createMediaElementSource(currentAudio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  visualize();

  const listItems = document.querySelectorAll('.song-list li');
  listItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });

  currentAudio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(currentAudio.duration);
  });

  currentAudio.addEventListener('timeupdate', () => {
    const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeDisplay.textContent = formatTime(currentAudio.currentTime);
  });

  currentAudio.addEventListener('ended', () => {
    isPlaying = false;
    playPauseButton.textContent = 'Play';
  });
}

progressBar.addEventListener('click', (e) => {
  if (currentAudio) {
    const clickX = e.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const seekTime = (clickX / progressBarWidth) * currentAudio.duration;
    currentAudio.currentTime = seekTime;
  }
});

function formatTime (time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function visualize() {
  const animate = () => {
    requestAnimationFrame(animate);
    analyser.getByteFrequencyData(dataArray);
    bars.forEach((bar, index) => {
      const height = dataArray[index] / 2;
      bar.style.height = `${height}px`;
      bar.style.backgroundColor = `hsl(${height}, 100%, 50%)`;
    });
  };
  animate();
}

playPauseButton.addEventListener('click', () => {
  if (currentAudio) {
    if (isPlaying) {
      currentAudio.pause();
      isPlaying = false;
      playPauseButton.textContent = 'Play';
    } else {
      currentAudio.play();
      isPlaying = true;
      playPauseButton.textContent = 'Pause';
    }
  }
});

uploadButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const song = {
      title: file.name,
      file: URL.createObjectURL(file),
      image: 'https://via.placeholder.com/300,',
    };
    songs.push(song);
    loadSongList();
  }
});

loadSongList();

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();