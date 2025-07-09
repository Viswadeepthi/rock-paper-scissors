let userScore = 0;
let botScore = 0;
let soundEnabled = true;

const result = document.getElementById("result");
const emoji = document.getElementById("emoji");
const userScoreEl = document.getElementById("userScore");
const botScoreEl = document.getElementById("botScore");

const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");

bgMusic.volume = 0.3;
clickSound.volume = 1;

// Start music after first click
document.body.addEventListener("click", () => {
  if (soundEnabled && bgMusic.paused) {
    bgMusic.play();
  }
}, { once: true });

document.getElementById("toggleSound").addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    bgMusic.play();
    document.getElementById("toggleSound").textContent = "🔊 Sound On";
  } else {
    bgMusic.pause();
    document.getElementById("toggleSound").textContent = "🔈 Sound Off";
  }
});

function speak(text) {
  const synth = window.speechSynthesis;
  const speakText = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();
  const femaleVoice = voices.find(voice => voice.name.includes("Female") || voice.name.includes("Samantha") || voice.name.includes("Google UK English Female"));
  speakText.voice = femaleVoice || voices[0];
  speakText.pitch = 1.2;
  speakText.rate = 1;
  synth.speak(speakText);
}

function play(player) {
  const choices = ["rock", "paper", "scissors"];
  const bot = choices[Math.floor(Math.random() * choices.length)];

  if (soundEnabled) clickSound.play();

  let message = "";
  let emojiText = "";

  if (player === bot) {
    message = "It's a draw!";
    emojiText = "😐";
  } else if (
    (player === "rock" && bot === "scissors") ||
    (player === "paper" && bot === "rock") ||
    (player === "scissors" && bot === "paper")
  ) {
    message = "You win!";
    emojiText = "🎉";
    userScore++;
  } else {
    message = "You lose!";
    emojiText = "💀";
    botScore++;
  }

  result.textContent = `Bot chose ${bot}. ${message}`;
  emoji.textContent = emojiText;
  userScoreEl.textContent = userScore;
  botScoreEl.textContent = botScore;

  if (soundEnabled) speak(message);
}
