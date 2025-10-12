import fishingRod from "./fishing_rod.png";
import "./style.css";

interface Upgrade {
  text: string;
  button: HTMLButtonElement;
  purchased: boolean;
  cost: number;
  rate: number;
}

document.body.innerHTML = `
  <p>Clicks: <span id="counter">0</span></p>
  <p>You are currently making $<span id="rate">0</span>/sec.</p>
  <button id="increment" class="clicker">
    <img src="${fishingRod}">
  </button>
  <button id="autoclick">💥</button>
`;
document.body.style.backgroundColor = "#6eadff";

// variable trackers
const time: number[] = [];
const upgradeA: Upgrade = {
  text: "Super Rod",
  button: document.getElementById("autoclick")! as HTMLButtonElement,
  purchased: false,
  cost: 10,
  rate: 0.1,
};
/*
const upgradeB: Upgrade = {
  text: "Fish Bait",
  purchased: false,
  cost: 100,
  rate: 2,
};
const upgradeC: Upgrade = {
  text: "Fishing Net",
  purchased: false,
  cost: 1000,
  rate: 50,
};
*/

let counter: number = 0;
let timePassed: number = 0;

let buttonTimer: number = 0;
let buttonCooldown: number = 500;
let buttonSize: number = 1;
let buttonVector: number = 0.0025;

// define html elements
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

function update() {
  calculateTime();
  autoCounter();
  animateButton();

  counterElement.innerHTML = counter.toFixed(2);
  /*
  rateElement.innerHTML = i == 0 ? "0" : upgradeAmount[i - 1].toString();
  autoButton.innerHTML = "💥 [ $" +
    (i < upgradeCost.length
      ? (upgradeCost[i] + " - $" + upgradeAmount[i] + "/sec ]")
      : "MAXED OUT ]");
  autoButton.disabled = (counter < upgradeCost[i] || i == upgradeCost.length)
    ? true
    : false;
  */

  // recursion to continue update going
  requestAnimationFrame(update);
}

function autoCounter() {
  if (upgradeA.purchased) {
    counter = counter + (timePassed / 10000) * upgradeA.rate;
  }
}

// measures time in seconds, not milliseconds
function calculateTime() {
  time.unshift(performance.now());
  if (time.length > 10) {
    const prev = time.pop();
    if (prev !== undefined) {
      timePassed = performance.now() - prev;
    }
  }
}

function animateButton() {
  if (buttonTimer >= buttonCooldown) {
    if (buttonSize > 1 || buttonSize < 0.925) {
      buttonVector = -buttonVector;
    }
    buttonSize = buttonSize + buttonVector;
    button.style.transform = "scale(" + buttonSize.toString() + ")";
    buttonTimer = 0;
  }
  buttonTimer += timePassed;
  console.log(buttonTimer);
}

// button listeners
button.addEventListener("click", () => {
  counter++;
});

upgradeA.button.addEventListener("click", () => {
  if (counter >= upgradeA.cost) {
    if (!upgradeA.purchased) upgradeA.purchased = true;
    counter = counter - upgradeA.cost;
  }
});

// constant updates
update();
