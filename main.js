import { createBoard } from "./memoryCard.js"

createBoard()

const audio = document.querySelector("audio");
audio.volume=0.4;
const buttonAudio = document.querySelector(".button-music");
buttonAudio.addEventListener("click", () => { 
  if (audio.paused) {
    audio.play();
    buttonAudio.classList.add("button-audio-active");
    buttonAudio.children[0].src="assets/images/Volume-Up.svg"
  }
  else {
    buttonAudio.children[0].src="assets/images/Volume-Off.svg"
    audio.pause();
    buttonAudio.classList.remove("button-audio-active");
  }
})

