import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// tracks clicks
let counter: number = 0;

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

function intervalClick() {
  counter = counter + 1;
}

function updateCounter() {
  counterElement.innerHTML = counter.toString();
}

button.addEventListener("click", () => {
  counter++;
  updateCounter();
});

autoButton.addEventListener("click", () => {
  setInterval(intervalClick, 1000);
  updateCounter();
});
