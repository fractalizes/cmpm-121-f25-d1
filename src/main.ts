import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// variable trackers
const time: number[] = [];
const upgradeCost: number[] = [10, 100, 1000];
const upgradeAmount: number[] = [0.1, 2, 50];
let i: number = 0;
let counter: number = 0;
let timePassed: number = 0;
let autoBool: boolean = false;

document.body.innerHTML = `
  <p>Clicks: <span id="counter">0</span></p>
  <p>You are currently making $<span id="rate">0</span>/sec.</p>
  <button id="increment">🤯</button>
  <button id="autoclick">💥</button>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

// define html elements
const button = document.getElementById("increment")!;
const autoButton = document.getElementById("autoclick")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const rateElement = document.getElementById("rate")!;

function update() {
  calculateTime();
  autoCounter();

  counterElement.innerHTML = counter.toFixed(2);
  rateElement.innerHTML = i == 0 ? "0" : upgradeAmount[i - 1].toString();
  autoButton.innerHTML = "💥 [ $" +
    (i < upgradeCost.length ? upgradeCost[i] : "MAX") +
    " - $" +
    (i < upgradeCost.length ? upgradeAmount[i] : upgradeAmount[i - 1]) +
    "/sec]";
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
