import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// tracks clicks
let counter: number = 0;
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
  counterElement.innerHTML = counter.toString();
}

// button listeners
button.addEventListener("click", () => {
  counter++;
});

autoButton.addEventListener("click", () => {
  autoBool = !autoBool;
});

// constant updates
setInterval(updateCounter, 10);
setInterval(function () {
  if (autoBool) {
    counter = counter + 1;
  }
}, 1000);
