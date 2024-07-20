import { createCanvas } from './draw/canvas';
import {
  drawMidlines,
  testRectSpecsGrid,
  testText,
} from './draw/testFunctions';
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

  testText(width, height, ctx);
  drawMidlines(width, height, ctx);
  testRectSpecsGrid(width, height, ctx);
};
