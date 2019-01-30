const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');

interface Coordinates {
  x: number;
  y: number;
}

export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomX() {
  return rand(10, canvas.width - 10);
}

export function randomY() {
  return rand(10, canvas.height - 10);
}

export function randomRGB() {
  // todo: create palettes
  let r = rand(10, 150);
  let g = rand(10, 150);
  let b = rand(10, 150);
  return `rgb(${r},${g},${b})`;
}

export function randomHSL() {
  // todo: create palettes
  let h = rand(150, 290);
  let s = rand(20, 50);
  let l = rand(50, 100);
  return `hsl(${h}, ${s}%, ${l}%, 1)`;
}

export function intersectsRect(mousePos: Coordinates, rect: Shapes.Rectangle) {
  // this is going to get tedious for other shapes...
  if (
      mousePos.x >= rect.x &&
      mousePos.x <= rect.x + rect.width &&
      mousePos.y >= rect.y &&
      mousePos.y <= rect.y + rect.height
    ) {
    return true;
  }
}
