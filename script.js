const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

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

    //calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    //avoid NaN
    if (currentSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
