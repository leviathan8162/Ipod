// ==========================
// 🎵 iPod PWA Advanced Player
// ==========================

// SONG DATA
const songs = [
  { title: "Song 1", artist: "Artist A", album: "Album One", file: "songs/song1.mp3" },
  { title: "Song 2", artist: "Artist A", album: "Album One", file: "songs/song2.mp3" },
  { title: "Song 3", artist: "Artist B", album: "Album Two", file: "songs/song3.mp3" },
  { title: "Overboard", artist: "The Grey Room", album: "TESTS", file: "songs/Overboard - The Grey Room _ Golden Palms.mp3" }
];

let currentSongIndex = 0;
const audio = document.getElementById("audio-player");
const menu = document.getElementById("menu");
const nowPlaying = document.getElementById("now-playing");
const songTitle = document.getElementById("song-title");
let inSubMenu = false;

// THEMES
const themes = {
  classic: { bg: "#bcbcbc", screen: "#000", text: "#fff", wheel: "#e8e8e8" },
  blue: { bg: "#87cefa", screen: "#001f3f", text: "#fff", wheel: "#a7c7e7" },
  green: { bg: "#a3d9a5", screen: "#001a00", text: "#fff", wheel: "#b7e2b8" },
  red: { bg: "#f5a3a3", screen: "#2b0000", text: "#fff", wheel: "#ffb6b6" }
};

let currentTheme = "classic";
function applyTheme(name) {
  const theme = themes[name];
  document.body.style.background = theme.bg;
  document.querySelector(".screen").style.background = theme.screen;
  document.querySelector(".screen").style.color = theme.text;
  document.querySelector(".wheel").style.background = theme.wheel;
}

// MENU
const items = document.querySelectorAll("#menu li");
let selectedIndex = 0;

function updateSelection() {
  items.forEach((item, i) => item.classList.toggle("selected", i === selectedIndex));
}

function openMainMenu() {
  menu.innerHTML = `
    <h2>iPod</h2>
    <ul>
      <li class="selected">Music</li>
      <li>Artists</li>
      <li>Albums</li>
      <li>Settings</li>
    </ul>
  `;
  selectedIndex = 0;
  inSubMenu = false;
  nowPlaying.classList.add("hidden");
}

function openMusicMenu() {
  inSubMenu = true;
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

function openArtistsMenu() {
  inSubMenu = true;
  const artists = [...new Set(songs.map(s => s.artist))];
  const list = document.createElement("ul");
  artists.forEach(artist => {
    const li = document.createElement("li");
    li.textContent = artist;
    li.addEventListener("click", () => openArtistSongs(artist));
    list.appendChild(li);
  });
  menu.innerHTML = "<h3>Artists</h3>";
  menu.appendChild(list);
}

function openArtistSongs(artist) {
  const list = document.createElement("ul");
  songs.filter(s => s.artist === artist).forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.addEventListener("click", () => playSong(songs.indexOf(song)));
    list.appendChild(li);
  });
  menu.innerHTML = `<h3>${artist}</h3>`;
  menu.appendChild(list);
}

function openAlbumsMenu() {
  inSubMenu = true;
  const albums = [...new Set(songs.map(s => s.album))];
  const list = document.createElement("ul");
  albums.forEach(album => {
    const li = document.createElement("li");
    li.textContent = album;
    li.addEventListener("click", () => openAlbumSongs(album));
    list.appendChild(li);
  });
  menu.innerHTML = "<h3>Albums</h3>";
  menu.appendChild(list);
}

function openAlbumSongs(album) {
  const list = document.createElement("ul");
  songs.filter(s => s.album === album).forEach(song => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.addEventListener("click", () => playSong(songs.indexOf(song)));
    list.appendChild(li);
  });
  menu.innerHTML = `<h3>${album}</h3>`;
  menu.appendChild(list);
}

function openSettingsMenu() {
  inSubMenu = true;
  const list = document.createElement("ul");
  Object.keys(themes).forEach(themeName => {
    const li = document.createElement("li");
    li.textContent = themeName.charAt(0).toUpperCase() + themeName.slice(1);
    li.addEventListener("click", () => {
      currentTheme = themeName;
      applyTheme(themeName);
    });
    list.appendChild(li);
  });
  menu.innerHTML = "<h3>Settings</h3>";
  menu.appendChild(list);
}

// PLAYBACK
function playSong(index) {
  const song = songs[index];
  audio.src = song.file;
  songTitle.textContent = `${song.title} — ${song.artist}`;
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

// CONTROLS
document.getElementById("menu-btn").addEventListener("click", () => {
  if (inSubMenu) openMainMenu();
  else {
    nowPlaying.classList.add("hidden");
    menu.classList.remove("hidden");
  }
});

document.getElementById("select-btn").addEventListener("click", () => {
  const options = ["Music", "Artists", "Albums", "Settings"];
  const selected = options[selectedIndex];
  if (selected === "Music") openMusicMenu();
  else if (selected === "Artists") openArtistsMenu();
  else if (selected === "Albums") openAlbumsMenu();
  else if (selected === "Settings") openSettingsMenu();
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
  if (!audio.src) playSong(currentSongIndex);
  else if (audio.paused) audio.play();
  else audio.pause();
});

document.getElementById("right-btn").addEventListener("dblclick", nextSong);
document.getElementById("left-btn").addEventListener("dblclick", prevSong);

// SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(console.error);
}

// INIT
applyTheme(currentTheme);
updateSelection();
