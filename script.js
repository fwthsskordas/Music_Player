const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill",
    artist: "Snap",
  },
  {
    name: "jacinto-2",
    displayName: "Orma Tous",
    artist: "Lex",
  },
  {
    name: "jacinto-3",
    displayName: "Ta skylia",
    artist: "Logos Timhs",
  },
  {
    name: "metric-1",
    displayName: "Stoixotherapia",
    artist: "Logos Timhs",
  },
];
let isPLaying = false;

//play
function playSong() {
  isPLaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

//pause
function pauseSong() {
  isPLaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

play.addEventListener("click", () => (isPLaying ? pauseSong() : playSong()));

//Update Dom

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

//next song
function nextSong() {
  if (songIndex < songs.length - 1) {
    songIndex++;
  } else {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

//prev song
function prevSong() {
  if (songIndex > 0) {
    songIndex--;
  } else {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

//on load
loadSong(songs[songIndex]);

//update progress
function updateProgressBar(e) {
  if (isPLaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

music.addEventListener("timeupdate", updateProgressBar);
