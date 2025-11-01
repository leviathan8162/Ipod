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

updateSelection();

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
