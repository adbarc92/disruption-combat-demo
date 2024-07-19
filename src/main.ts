import { drawBattleArena } from './battleDraw';
import { createCanvas } from './canvas';
import { COLOR_BLACK, COLOR_BLUE, COLOR_RED, COLOR_WHITE } from './color';
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

const testShapes = (
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
    COLOR_BLACK,
    COLOR_BLUE,
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

const testText = (
  canvasWidth: number,
  canvasHeight: number,
  ctx: CanvasContext,
) => {
  drawText(
    'Disruption Combat Demo',
    canvasWidth / 2 - 50,
    120,
    { color: COLOR_WHITE, align: 'center' },
    ctx,
  );
};

const testBattleArena = (
  canvasWidth: number,
  canvasHeight: number,
  ctx: CanvasContext,
) => {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const squareSize = 100;

  drawBattleArena(centerX, centerY, squareSize, COLOR_BLACK, COLOR_BLUE, ctx);
};

const drawMidlines = (
  canvasWidth: number,
  canvasHeight: number,
  ctx: CanvasContext,
) => {
  ctx.strokeStyle = COLOR_BLACK.name;
  ctx.beginPath();
  ctx.moveTo(0, canvasHeight / 2);
  ctx.lineTo(canvasWidth, canvasHeight / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2, 0);
  ctx.lineTo(canvasWidth / 2, canvasHeight);
  ctx.stroke();
};

export const main = () => {
  const { width, height, ctx } = createWindowCanvasAndReturnSpecs();
  // testShapes(width, height, ctx);
  testText(width, height, ctx);
  drawMidlines(width, height, ctx);
  testBattleArena(width, height, ctx);
};
