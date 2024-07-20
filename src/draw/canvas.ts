/**
 * Canvas: a means for drawing graphics
 * Context: the thing onto which the drawing will be rendered
 * The actual drawing is done via the context's methods.
 */

import { CanvasContext } from '../types';
import { COLOR_WHITE } from './color';
import { drawRect } from './draw';

let globalCanvas: HTMLCanvasElement | null = null;
const CANVAS_DEFAULT_HEIGHT = 576;
const CANVAS_DEFAULT_WIDTH = 576;

export const createCanvas = (
  width: number = CANVAS_DEFAULT_WIDTH,
  height: number = CANVAS_DEFAULT_HEIGHT,
): [HTMLCanvasElement, CanvasContext, number, number] => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d') as CanvasContext;
  ctx.imageSmoothingEnabled = true; // Determines whether scaled images are smoothed
  return [canvas, ctx, width, height];
};

const getGlobalCanvas = (): HTMLCanvasElement => {
  if (globalCanvas) return globalCanvas;

  const [canvas] = createCanvas();
  globalCanvas = canvas;
  return canvas;
};

export const getGlobalCtx = (): CanvasContext => {
  return getGlobalCanvas().getContext('2d') as CanvasContext;
};

export const clearCanvas = (canvas?: HTMLCanvasElement) => {
  canvas = canvas || getGlobalCanvas();
  drawRect({
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height,
    fillColor: COLOR_WHITE,
    outlineColor: COLOR_WHITE,
    ctx: canvas.getContext('2d') as CanvasContext,
  });
};
