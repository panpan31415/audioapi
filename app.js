// Loading sound
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const audioElement = document.getElementById("audio");
const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);

//Controlling sound
const playBtn = document.getElementById("play-btn");
playBtn.addEventListener(
  "click",
  event => {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    if (event.target.dataset.playing === "false") {
      audioElement.play();
      event.target.dataset.playing = "true";
      event.target.innerHTML = "Pause";
    } else if (event.target.dataset.playing === "true") {
      audioElement.pause();
      event.target.dataset.playing === "false";
      event.target.innerHTML = "Play";
    }
  },
  false,
);
audioElement.addEventListener(
  "ended",
  () => {
    playButton.dataset.playing = "false";
  },
  false,
);

//Modifying sound
const volumeControl = document.querySelector("#volume");
const gainNode = audioContext.createGain();

track.connect(gainNode).connect(audioContext.destination);
volumeControl.addEventListener(
  "input",
  function() {
    gainNode.gain.value = this.value;
  },
  false,
);

//Adding stereo panning to our app
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);
const pannerControl = document.querySelector("#panner");

pannerControl.addEventListener(
  "input",
  function() {
    panner.pan.value = this.value;
  },
  false,
);
track
  .connect(gainNode)
  .connect(panner)
  .connect(audioContext.destination);
