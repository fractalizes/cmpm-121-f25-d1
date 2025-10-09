import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// variable trackers
const time: number[] = [];
const upgradeCost: number[] = [10, 50, 100];
const upgradeAmount: number[] = [0.5, 1, 1.5];
let i: number = 0;
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
const autoButton = document.getElementById("autoclick")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;

function update() {
  calculateTime();
  autoCounter();

  counterElement.innerHTML = counter.toFixed(2);
  autoButton.innerHTML = "💥 - " +
    (i < upgradeCost.length ? upgradeCost[i] : "MAX");
  autoButton.disabled = (counter < upgradeCost[i] || i == upgradeCost.length)
    ? true
    : false;

  requestAnimationFrame(update);
}

function autoCounter() {
  if (autoBool) {
    counter = counter +
      timePassed * upgradeAmount[i < upgradeCost.length ? i : i - 1];
  }
}

// measures time in seconds, not milliseconds
function calculateTime() {
  time.unshift(performance.now());
  if (time.length > 10) {
    const prev = time.pop();
    if (prev !== undefined) {
      timePassed = (performance.now() - prev) / 10000;
    }
  }
}

// button listeners
button.addEventListener("click", () => {
  counter++;
});

autoButton.addEventListener("click", () => {
  if (counter >= upgradeCost[i] && i < upgradeCost.length) {
    counter = counter - upgradeCost[i];
    i++;

    if (!autoBool) {
      autoBool = true;
    }
  }
});

// constant updates
update();
autoCounter();
