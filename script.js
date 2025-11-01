// ==========================
// 🎵 iPod PWA Music Player
// ==========================

// Song Library
const songs = [
  { title: "Song 1", file: "songs/song1.mp3" },
  { title: "Song 2", file: "songs/song2.mp3" },
  { title: "Song 3", file: "songs/song3.mp3" }
];

let currentSongIndex = 0;
const audio = document.getElementById("audio-player");
const menu = document.getElementById("menu");
const nowPlaying = document.getElementById("now-playing");
const songTitle = document.getElementById("song-title");

const items = document.querySelectorAll("#menu li");
let selectedIndex = 0;

// ==========================
// 🧭 Menu Navigation
// ==========================
function updateSelection() {
  items.forEach((item, i) => {
    item.classList.toggle("selected", i === selectedIndex);
  });
}

// Open Menu
document.getElementById("menu-btn").addEventListener("click", () => {
  nowPlaying.classList.add("hidden");
  menu.classList.remove("hidden");
});

// Select Option
document.getElementById("select-btn").addEventListener("click", () => {
  const selected = items[selectedIndex].textContent;
  if (selected === "Music") {
    openMusicMenu();
  } else if (selected === "Settings") {
    alert("Settings coming soon 🎚️");
  }
});

// Move Left/Right Through Menu
document.getElementById("left-btn").addEventListener("click", () => {
  selectedIndex = (selectedIndex - 1 + items.length) % items.length;
  updateSelection();
});

document.getElementById("right-btn").addEventListener("click", () => {
  selectedIndex = (selectedIndex + 1) % items.length;
  updateSelection();
});

// ==========================
// 🎶 Music Player Functions
// ==========================
function playSong(index) {
  const song = songs[index];
  audio.src = song.file;
  songTitle.textContent = song.title;
  audio.play();
  nowPlaying.classList.remove("hidden");
  menu.classList.add("hidden");
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
}

// ==========================
// ⏯️ Playback Controls
// ==========================
document.getElementById("play-btn").addEventListener("click", () => {
  if (!audio.src) {
    playSong(currentSongIndex);
  } else if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

document.getElementById("right-btn").addEventListener("dblclick", nextSong);
document.getElementById("left-btn").addEventListener("dblclick", prevSong);

// ==========================
// 📁 Dynamic Music Menu
// ==========================
function openMusicMenu() {
  const list = document.createElement("ul");
  list.id = "music-list";
  songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.addEventListener("click", () => {
      currentSongIndex = i;
      playSong(i);
    });
    list.appendChild(li);
  });

  menu.innerHTML = "<h3>Music</h3>";
  menu.appendChild(list);
}

// ==========================
// 💾 Service Worker
// ==========================
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(console.error);
}

// Initial update
updateSelection();
