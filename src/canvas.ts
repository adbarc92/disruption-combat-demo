/**
 * Canvas: a means for drawing graphics
 * Context: the thing onto which the drawing will be rendered
 * The actual drawing is done via the context's methods.
 */

let globalCanvas: HTMLCanvasElement | null = null;
const CANVAS_DEFAULT_HEIGHT = 576;
const CANVAS_DEFAULT_WIDTH = 576;

const createCanvas = (
  width: number = CANVAS_DEFAULT_WIDTH,
  height: number = CANVAS_DEFAULT_HEIGHT
): [HTMLCanvasElement, CanvasRenderingContext2D, number, number] => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = true; // Determines whether scaled images are smoothed
  return [canvas, ctx, width, height];
};

const getGlobalCanvas = (): HTMLCanvasElement => {
  if (globalCanvas) return globalCanvas;

  const [canvas, ctx, width, height] = createCanvas();
  globalCanvas = canvas;
  return canvas;
};

const getGlobalCtx = (): CanvasRenderingContext2D => {
  return getGlobalCanvas().getContext("2d") as CanvasRenderingContext2D;
};
