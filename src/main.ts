import fishingRod from "./fishing_rod.png";
import "./style.css";

interface Upgrade {
  text: string;
  icon: string;
  button: HTMLButtonElement;
  purchased: boolean;
  quantity: number;
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
document.body.style.backgroundColor = "#0256a6";

// upgrades
const upgradeA: Upgrade = {
  text: "Super Rod",
  icon: "🎣",
  button: document.getElementById("rod-upgrade")! as HTMLButtonElement,
  purchased: false,
  quantity: 0,
  cost: 10,
  rate: 0.1,
};
const upgradeB: Upgrade = {
  text: "Fish Bait",
  icon: "🪱",
  button: document.getElementById("bait-upgrade")! as HTMLButtonElement,
  purchased: false,
  quantity: 0,
  cost: 100,
  rate: 2,
};
const upgradeC: Upgrade = {
  text: "Fishing Net",
  icon: "🕸️",
  button: document.getElementById("net-upgrade")! as HTMLButtonElement,
  purchased: false,
  quantity: 0,
  cost: 1000,
  rate: 50,
};

// variable trackers
const upgrades: Upgrade[] = [
  upgradeA,
  upgradeB,
  upgradeC,
];
const time: number[] = [];
let timePassed: number = 0;
let counter: number = 0;
let rate: number = 0;

// button animation variables
let buttonTimer: number = 0;
const buttonCooldown: number = 500;
let buttonSize: number = 1;
let buttonVector: number = 0.0025;

// define html elements
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const rateElement = document.getElementById("rate")!;

function update() {
  calculateTime();
  autoCounter();
  animateClicker();
  updateAssets();

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

function updateAssets() {
  upgrades.forEach((upgrade) => {
    upgrade.button.style.background = counter >= upgrade.cost
      ? "#ffffff9e"
      : "#ffffff42";
    upgrade.button.innerHTML = upgrade.icon + upgrade.text + " x" +
      upgrade.quantity + "<br>[ $" + upgrade.cost.toFixed(2) + " ~ $" +
      upgrade.rate.toFixed(2) + "/sec ]";
  });

  counterElement.innerHTML = counter.toFixed(2);
  rateElement.innerHTML = rate.toFixed(2);
}

// #6eadff, #427bf5

// button listeners
button.addEventListener("click", () => {
  counter++;
});

upgradeA.button.addEventListener("click", () => {
  if (counter >= upgradeA.cost) {
    counter -= upgradeA.cost;
    rate += upgradeA.rate;
    upgradeA.cost *= 1.15;
    upgradeA.quantity++;
    if (!upgradeA.purchased) upgradeA.purchased = true;
    else upgradeA.rate += upgradeA.rate;
  }
});

upgradeB.button.addEventListener("click", () => {
  if (counter >= upgradeB.cost) {
    counter -= upgradeB.cost;
    rate += upgradeB.rate;
    upgradeB.cost *= 1.15;
    upgradeB.quantity++;
    if (!upgradeB.purchased) upgradeB.purchased = true;
    else upgradeB.rate += upgradeB.rate;
  }
});

upgradeC.button.addEventListener("click", () => {
  if (counter >= upgradeC.cost) {
    counter -= upgradeC.cost;
    rate += upgradeC.rate;
    upgradeC.cost *= 1.15;
    upgradeC.quantity++;
    if (!upgradeC.purchased) upgradeC.purchased = true;
    else upgradeC.rate += upgradeC.rate;
  }
});

// game loop
update();
