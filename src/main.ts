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
  <button id="increment" td class="clicker">
    <img src="${fishingRod}">
  </button>
  <div class="upgrade-display">
    <button id="rod-upgrade" td class="upgrade">
      🎣
    </button>
    <button id="bait-upgrade" td class="upgrade">
      🪱
    </button>
    <button id="net-upgrade" td class="upgrade">
      🕸️
    </button>
  </div>
`;
document.body.style.backgroundColor = "#6eadff";

// upgrades
const upgradeA: Upgrade = {
  text: "Super Rod",
  button: document.getElementById("rod-upgrade")! as HTMLButtonElement,
  purchased: false,
  cost: 10,
  rate: 0.1,
};
const upgradeB: Upgrade = {
  text: "Fish Bait",
  button: document.getElementById("bait-upgrade")! as HTMLButtonElement,
  purchased: false,
  cost: 100,
  rate: 2,
};
const upgradeC: Upgrade = {
  text: "Fishing Net",
  button: document.getElementById("net-upgrade")! as HTMLButtonElement,
  purchased: false,
  cost: 1000,
  rate: 50,
};

// variable trackers
const time: number[] = [];
let timePassed: number = 0;
let counter: number = 0;

// button animation variables
let buttonTimer: number = 0;
const buttonCooldown: number = 500;
let buttonSize: number = 1;
let buttonVector: number = 0.0025;

// define html elements
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

function update() {
  calculateTime();
  autoCounter();
  animateClicker();
  updateButtons();

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
  counter += (upgradeA.purchased ? (timePassed / 10000) * upgradeA.rate : 0) +
    (upgradeB.purchased ? (timePassed / 10000) * upgradeB.rate : 0);
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

function animateClicker() {
  if (buttonTimer >= buttonCooldown) {
    if (buttonSize > 1 || buttonSize < 0.925) {
      buttonVector = -buttonVector;
    }
    buttonSize = buttonSize + buttonVector;
    button.style.transform = "scale(" + buttonSize.toString() + ")";
    buttonTimer = 0;
  }
  buttonTimer += timePassed;
}

function updateButtons() {
  counterElement.innerHTML = counter.toFixed(2);
}

// button listeners
button.addEventListener("click", () => {
  counter++;
});

upgradeA.button.addEventListener("click", () => {
  if (counter >= upgradeA.cost) {
    if (!upgradeA.purchased) upgradeA.purchased = true;
    else upgradeA.rate += upgradeA.rate;
    counter -= upgradeA.cost;
    upgradeA.cost *= 1.15;
  }
});

upgradeB.button.addEventListener("click", () => {
  if (counter >= upgradeB.cost) {
    if (!upgradeB.purchased) upgradeB.purchased = true;
    else upgradeB.rate += upgradeB.rate;
    counter -= upgradeB.cost;
    upgradeB.cost *= 1.15;
  }
});

upgradeC.button.addEventListener("click", () => {
  if (counter >= upgradeB.cost) {
    if (!upgradeC.purchased) upgradeB.purchased = true;
    else upgradeC.rate += upgradeB.rate;
    counter -= upgradeC.cost;
    upgradeC.cost *= 1.15;
  }
});

// game loop
update();
