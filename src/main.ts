import { createCanvas } from './canvas';
import { drawMidlines, testRectSpecsGrid, testText } from './testFunctions';
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

export const main = () => {
  const { width, height, ctx } = createWindowCanvasAndReturnSpecs();
  // testShapes(width, height, ctx);
  testText(width, height, ctx);
  drawMidlines(width, height, ctx);
  // testDrawRectGrid(width, height, ctx);
  testRectSpecsGrid(width, height, ctx);
};
