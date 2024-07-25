import { Game } from './model/game';
import { CanvasContext, CanvasSpecs } from './model/types';

const CANVAS_HOLDER_ID = 'coreCanvas';

const initCanvas = (): CanvasSpecs => {
  const canvas = document.getElementById(CANVAS_HOLDER_ID) as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d') as CanvasContext;
  ctx.imageSmoothingEnabled = true; // Determines whether scaled images are smoothed
  return {
    width: canvas.width,
    height: canvas.height,
    canvas,
    ctx,
  };
};

const addEventListeners = (game: Game) => {
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowUp':
        game.handleArrowUp();
        break;
      case 'ArrowDown':
        game.handleArrowDown();
        break;
      case 'ArrowRight':
        game.handleArrowRight();
        break;
      case 'ArrowLeft':
        game.handleArrowLeft();
        break;
      case 'Enter':
        game.handleEnter();
        break;
      case 'Insert':
        game.handleInsert();
        break;
    }
  });
};

export const main = async () => {
  console.log('Loading game...');
  console.log('Loaded sprites.');
  console.log('Loading database...');
  console.log('Loaded database.');
  console.log('Creating game...');
  const { ctx } = initCanvas();
  const game = new Game(ctx);
  console.log('Created game.');
  console.log('Adding event listeners...');
  addEventListeners(game);
  console.log('Added event listeners.');
  console.log('Starting game...');
  game.start();
};
