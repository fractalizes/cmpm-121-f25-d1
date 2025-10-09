import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// variable trackers
const time: number[] = [];
let counter: number = 0;
let timePassed: number = 0;
let autoBool: boolean = false;

document.body.innerHTML = `
  <p>Clicks: <span id="counter">0</span></p>
  <button id="increment">🤯</button>
  <button id="autoclick">💥</button>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

// define html elements
const button = document.getElementById("increment")!;
const autoButton = document.getElementById("autoclick")!;
const counterElement = document.getElementById("counter")!;

function updateCounter() {
  calculateTime();
  autoCounter();
  counterElement.innerHTML = counter.toFixed(2);
  requestAnimationFrame(updateCounter);
}

function autoCounter() {
  if (autoBool) {
    counter = counter + timePassed;
  }
}

// measures time in seconds, not milliseconds
function calculateTime() {
  time.unshift(performance.now());
  if (time.length > 10) {
    timePassed = (performance.now() - time.pop()) / 10000;
  }
}

// button listeners
button.addEventListener("click", () => {
  counter++;
});

autoButton.addEventListener("click", () => {
  autoBool = !autoBool;
});

// constant updates
updateCounter();
autoCounter();
