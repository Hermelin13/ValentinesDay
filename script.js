const bubble = document.getElementById("bubble");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");

const noMessages = [
  "That button seems to be allergic to your cursor.",
  "Nice try. The universe says: maybe click the other one?",
  "Okay but hear me out: pizza and cuddles.",
  "The 'no' option has been outsourced to the 'yes' option.",
  "Plot twist: the only valid answer is adorable.",
];

let noCount = 0;

function moveNoButton() {
  const maxX = 160;
  const maxY = 80;
  const offsetX = Math.round((Math.random() - 0.5) * maxX);
  const offsetY = Math.round((Math.random() - 0.5) * maxY);
  noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

noBtn.addEventListener("mouseenter", () => {
  moveNoButton();
});

noBtn.addEventListener("click", () => {
  moveNoButton();
  bubble.textContent = noMessages[noCount % noMessages.length];
  noCount += 1;
});

yesBtn.addEventListener("click", () => {
  result.hidden = false;
  bubble.textContent = "Confirmed: you are officially my favorite human.";
  yesBtn.disabled = true;
  noBtn.disabled = true;
  yesBtn.style.transform = "scale(1.05)";
  noBtn.style.opacity = "0.4";
});
