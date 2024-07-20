import { createCanvas } from './draw/canvas';
import {
  drawMidlines,
  testRectSpecsGrid,
  testText,
} from './draw/testFunctions';
import { Game } from './game';
import { CanvasSpecs } from './types';

const CANVAS_HOLDER_ID = 'canvasHolder';

const createWindowCanvasAndReturnSpecs = (): CanvasSpecs => {
  const [canvas, ctx, width, height] = createCanvas(
    window.innerWidth,
    window.innerHeight,
  );
  canvas.id = 'canvas';
  document.getElementById(CANVAS_HOLDER_ID)?.appendChild(canvas);
  return { width, height, canvas, ctx };
};

// const addEventListeners = (game: Game) => {
//   document.addEventListener("keydown", (event: KeyboardEvent) => {
//     switch(event.code) {
//       case 'ArrowUp':
//     }
//   })
// };

export const main = async () => {
  console.log('Loading game...');
  // FIXME: Load sprites
  console.log('Loaded sprites.');
  console.log('Loading database...');
  // FIXME: Load database
  console.log('Loaded database.');
  console.log('Creating game...');
  const { width, height, ctx } = createWindowCanvasAndReturnSpecs();
  const game = new Game(ctx);
  console.log('Created game.');
  console.log('Starting game...');
  game.start();
  // testText(width, height, ctx);
  // drawMidlines(width, height, ctx);
  // testRectSpecsGrid(width, height, ctx);
};
