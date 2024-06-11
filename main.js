const h1 = document.createElement("h1");
const canvas = document.createElement("div");
const input = document.createElement("input");
const button = document.createElement("button");
button.textContent = "Create Grid";
h1.textContent = "Odin Etch-a-Sketch";
const rem = document.createElement("button");
input.placeholder = "Enter a number (≤100)";
rem.textContent = "Reset";
canvas.style.cssText =
  "border: 2px solid black; width: 600px; height: 600px; background-color: lightgrey; margin-bottom: 10px";
document.body.appendChild(h1);
document.body.appendChild(canvas);
document.body.appendChild(input);
document.body.appendChild(button);
document.body.appendChild(rem);

let isMouseDown = false;

rem.addEventListener("click", () => {
  const squares = canvas.querySelectorAll("div > div");
  squares.forEach((square) => {
    square.style.backgroundColor = "lightgrey";
  });
});

button.addEventListener("click", () => {
  canvas.innerHTML = "";
  const limit = Number(input.value);
  input.value = "";
  input.focus();
  const dim = 600 / limit;
  for (let i = 1; i <= limit; i++) {
    const row = document.createElement("div");
    row.style.cssText = "display: flex;";
    row.style.height = dim.toString() + "px";
    canvas.appendChild(row);
    for (let j = 1; j <= limit; j++) {
      const square = document.createElement("div");
      square.style.cssText =
        "display: flex; border: 0.5px solid grey; background-color: lightgrey; box-sizing: border-box;";
      square.style.height = dim.toString() + "px";
      square.style.width = dim.toString() + "px";
      square.draggable = false;
      square.addEventListener("dragstart", (e) => {
        e.preventDefault();
      });
      row.appendChild(square);
    }
  }
});

canvas.addEventListener("mousedown", (e) => {
  if (e.target !== canvas && canvas.contains(e.target)) {
    isMouseDown = true;
    e.target.style.backgroundColor = "black";
  }
});

canvas.addEventListener("mouseover", (e) => {
  if (isMouseDown && e.target !== canvas && canvas.contains(e.target)) {
    e.target.style.backgroundColor = "black";
  }
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// Handle touch input
canvas.addEventListener("touchstart", (e) => {
  if (e.target !== canvas && canvas.contains(e.target)) {
    isMouseDown = true;
    e.target.style.backgroundColor = "black";
  }
  e.preventDefault(); // Prevent default behavior to avoid issues with touch scrolling
});

canvas.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (isMouseDown && target && canvas.contains(target) && target !== canvas) {
    target.style.backgroundColor = "black";
  }
  e.preventDefault(); // Prevent default behavior to avoid issues with touch scrolling
});

document.addEventListener("touchend", () => {
  isMouseDown = false;
});

// Trigger button click event when Enter key is pressed in the input field
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const clickEvent = new Event("click");
    button.dispatchEvent(clickEvent);
  }
});
