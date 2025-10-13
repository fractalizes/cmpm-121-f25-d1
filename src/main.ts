import fishingRod from "./fishing_rod.png"; // fishing rod asset from Google Noto Color Emoji
import "./style.css";

interface Upgrade {
  icon: string;
  text: string;
  flavor: string;
  button: HTMLButtonElement;
  purchased: boolean;
  quantity: number;
  cost: number;
  rate: number;
}

document.body.innerHTML = `
  <div class="upgrade-display">
    <h1 style="grid-area: box-1">
      🐟 GONE FISHING! 🐟
    </h1>
    <p style="grid-area: box-2">
      Total: $<span id="counter">0</span> ($<span id="rate">0</span>/sec)
    </p>
    <button id="increment" class="clicker" style="grid-area: box-3">
      <img src="${fishingRod}">
    </button>
    <button id="rod-upgrade" class="upgrade" style="grid-area: box-4">
      🎣
    </button>
    <button id="bait-upgrade" class="upgrade" style="grid-area: box-5">
      🪱
    </button>
    <button id="net-upgrade" class="upgrade" style="grid-area: box-6">
      🕸️
    </button>
    <button id="fran-upgrade" class="upgrade" style="grid-area: box-7">
      🧍
    </button>
    <button id="ship-upgrade" class="upgrade" style="grid-area: box-8">
      ⚓
    </button>
  </div>
`;
document.body.style.backgroundColor = "#0256a6";

// upgrades
const upgradeA: Upgrade = {
  icon: "🎣",
  text: "Super Rod",
  flavor: "",
  button: document.getElementById("rod-upgrade")! as HTMLButtonElement,
  purchased: false,
  quantity: 0,
  cost: 10,
  rate: 0.1,
};
const upgradeB: Upgrade = {
  icon: "🪱",
  text: "Fish Bait",
  flavor: "",
  button: document.getElementById("bait-upgrade")! as HTMLButtonElement,
  purchased: false,
  quantity: 0,
  cost: 100,
  rate: 2,
};
const upgradeC: Upgrade = {
  icon: "🕸️",
  text: "Fishing Net",
  flavor: "",
  button: document.getElementById("net-upgrade")! as HTMLButtonElement,
  purchased: false,
  quantity: 0,
  cost: 1000,
  rate: 50,
};
const upgradeD: Upgrade = {
  icon: "🧍",
  text: "Fisherman Fran",
  flavor: "",
  button: document.getElementById("fran-upgrade")! as HTMLButtonElement,
  purchased: false,
  quantity: 0,
  cost: 1000,
  rate: 100,
};
const upgradeE: Upgrade = {
  icon: "⚓",
  text: "Better Ship",
  flavor: "",
  button: document.getElementById("ship-upgrade")! as HTMLButtonElement,
  purchased: false,
  quantity: 0,
  cost: 10000,
  rate: 500,
};

// variable trackers
const upgrades: Upgrade[] = [
  upgradeA,
  upgradeB,
  upgradeC,
  upgradeD,
  upgradeE,
];
const time: number[] = [];
let timePassed: number = 0;
let counter: number = 0;
let rate: number = 0;

// button animation variables
const buttonMin: number = 1;
const buttonMax: number = 1.25;
const buttonCooldown: number = 500;
let buttonTimer: number = 0;
let buttonSize: number = buttonMin;
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
  /*rate = (upgradeA.purchased ? upgradeA.rate : 0) +
    (upgradeB.purchased ? upgradeB.rate : 0) +
    (upgradeC.purchased ? upgradeB.rate : 0);*/
  counter += rate * timePassed / 10000;
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
    if (buttonSize > buttonMax || buttonSize < buttonMin) {
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

upgrades.forEach((upgrade) => {
  rate = 0;
  upgrade.button.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      if (!upgrade.purchased) upgrade.purchased = true;
      rate += upgrade.rate;

      upgrade.rate += upgrade.rate;
      counter -= upgrade.cost;
      upgrade.cost *= upgrade.quantity >= 10
        ? (upgrade.quantity >= 25 ? 1.75 : 1.5)
        : 1.25;
      upgrade.quantity++;
    }
  });
});

// game loop
update();
