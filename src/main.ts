import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// tracks clicks
let counter: number = 0;

document.body.innerHTML = `
  <p>Clicks: <span id="counter">0</span></p>
  <button id="increment">🤯</button>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

// define html elements
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter++;
  counterElement.innerHTML = counter.toString();
});
