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
const reactionDelay = 220;
const moveCooldown = 200;
let lastMoveAt = 0;
let pendingMoveId = null;
let baseRect = null;

function updateBaseRect() {
  noBtn.style.transform = "translate(0, 0)";
  baseRect = noBtn.getBoundingClientRect();
}

updateBaseRect();
window.addEventListener("resize", updateBaseRect);

function moveNoButton(event) {
  const maxX = 260;
  const maxY = 260;
  const minJump = 180;
  if (!baseRect) {
    updateBaseRect();
  }
  const rect = noBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const mouseX = event?.clientX ?? centerX;
  const mouseY = event?.clientY ?? centerY;
  const awayX = centerX - mouseX;
  const awayY = centerY - mouseY;
  const length = Math.hypot(awayX, awayY) || 1;
  const directionX = awayX / length;
  const directionY = awayY / length;
  const jump = minJump + Math.random() * (Math.min(maxX, maxY) - minJump);
  const randomX = (Math.random() - 0.5) * maxX;
  const randomY = (Math.random() - 0.5) * maxY;
  const offsetX = Math.round(directionX * jump + randomX);
  const offsetY = Math.round(directionY * jump + randomY);
  const margin = 12;
  const minOffsetX = margin - baseRect.left;
  const maxOffsetX = window.innerWidth - margin - baseRect.right;
  const minOffsetY = margin - baseRect.top;
  const maxOffsetY = window.innerHeight - margin - baseRect.bottom;
  const clampedX = Math.min(maxOffsetX, Math.max(minOffsetX, offsetX));
  const clampedY = Math.min(maxOffsetY, Math.max(minOffsetY, offsetY));
  noBtn.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
}

function scheduleMove(event) {
  if (noBtn.disabled) {
    return;
  }
  const now = Date.now();
  if (now - lastMoveAt < moveCooldown) {
    return;
  }
  if (pendingMoveId) {
    clearTimeout(pendingMoveId);
  }
  const clientX = event?.clientX;
  const clientY = event?.clientY;
  pendingMoveId = setTimeout(() => {
    moveNoButton({ clientX, clientY });
    lastMoveAt = Date.now();
    pendingMoveId = null;
  }, reactionDelay);
}

noBtn.addEventListener("mouseenter", (event) => {
  scheduleMove(event);
});

noBtn.addEventListener("click", (event) => {
  scheduleMove(event);
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
