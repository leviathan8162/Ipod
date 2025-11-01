// Menu navigation
const items = document.querySelectorAll("#menu li");
let selectedIndex = 0;
const menu = document.getElementById("menu");
const nowPlaying = document.getElementById("now-playing");
const audio = document.getElementById("audio-player");

function updateSelection() {
  items.forEach((item, i) => {
    item.classList.toggle("selected", i === selectedIndex);
  });
}

document.getElementById("menu-btn").addEventListener("click", () => {
  nowPlaying.classList.add("hidden");
  menu.classList.remove("hidden");
});

document.getElementById("select-btn").addEventListener("click", () => {
  const selected = items[selectedIndex].textContent;
  if (selected === "Music") {
    nowPlaying.classList.remove("hidden");
    menu.classList.add("hidden");
    document.getElementById("song-title").textContent = "Demo Song";
    audio.src = "songs/demo.mp3"; // put your song path here
    audio.play();
  }
});

document.getElementById("left-btn").addEventListener("click", () => {
  selectedIndex = (selectedIndex - 1 + items.length) % items.length;
  updateSelection();
});

document.getElementById("right-btn").addEventListener("click", () => {
  selectedIndex = (selectedIndex + 1) % items.length;
  updateSelection();
});

document.getElementById("play-btn").addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

const songs = [
  { title: "Example Song 1", file: "songs/song1.mp3" },
  { title: "Example Song 2", file: "songs/song2.mp3" },
  { title: "Example Song 3", file: "songs/song3.mp3" }
];

let currentSongIndex = 0;
const audio = document.getElementById("audio-player");
const songTitle = document.getElementById("song-title");

function playSong(index) {
  const song = songs[index];
  audio.src = song.file;
  songTitle.textContent = song.title;
  audio.play();
}

// when user presses ▶||
document.getElementById("play-btn").addEventListener("click", () => {
  if (audio.paused && audio.src) {
    audio.play();
  } else if (!audio.src) {
    playSong(currentSongIndex);
  } else {
    audio.pause();
  }
});

// skip forward/back
document.getElementById("right-btn").addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
});

document.getElementById("left-btn").addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
});


updateSelection();

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
