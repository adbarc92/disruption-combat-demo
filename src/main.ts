import { createCanvas } from './canvas';
import { COLOR_BLACK, COLOR_RED, COLOR_WHITE } from './color';
import { drawCircle, drawRect, drawText } from './draw';
import { CanvasContext, CanvasSpecs } from './types';

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

const shapeTest = (
  canvasWidth: number,
  canvasHeight: number,
  ctx: CanvasContext,
) => {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const squareSize = 100;

  drawRect(
    centerX - squareSize,
    centerY - squareSize,
    squareSize,
    squareSize,
    true,
    COLOR_BLACK,
    ctx,
  );

  drawCircle(
    centerX - squareSize / 2,
    centerY - squareSize / 2,
    squareSize / 2 - 10,
    true,
    COLOR_RED,
    ctx,
  );
};

const textTest = (
  canvasWidth: number,
  canvasHeight: number,
  ctx: CanvasContext,
) => {
  drawText(
    'Disruption Combat Demo',
    canvasWidth / 2 - 50,
    canvasWidth / 2 + 100,
    { color: COLOR_WHITE },
    ctx,
  );
};

export const main = () => {
  const { width, height, canvas, ctx } = createWindowCanvasAndReturnSpecs();
  shapeTest(width, height, ctx);
  textTest(width, height, ctx);
};
