import { createCanvas, getGlobalCtx } from "./canvas";
import { COLOR_BLACK, COLOR_RED } from "./color";
import { drawCircle, drawRect } from "./draw";
import { CanvasContext, CanvasSpecs } from "./types";

const CANVAS_HOLDER_ID = "canvasHolder";

const createWindowCanvasAndReturnSpecs = (): CanvasSpecs => {
  const [canvas, ctx, width, height] = createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  canvas.id = "canvas";
  document.getElementById(CANVAS_HOLDER_ID)?.appendChild(canvas);
  return { width, height, canvas, ctx };
};

const shapeTest = (width: number, height: number, ctx: CanvasContext) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const squareSize = 100;

  drawCircle(
    centerX - squareSize,
    centerY - squareSize,
    squareSize,
    true,
    COLOR_RED,
    ctx
  );
  ctx.globalCompositeOperation = "destination-over";
  drawRect(
    centerX - squareSize,
    centerY - squareSize,
    squareSize,
    squareSize,
    true,
    COLOR_BLACK,
    ctx
  );
};

export const main = () => {
  const { width, height, canvas, ctx } = createWindowCanvasAndReturnSpecs();
  shapeTest(width, height, ctx);
};
