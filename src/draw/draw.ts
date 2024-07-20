/**
 * Functions for drawing shapes and text to the canvas.
 */

import { getGlobalCtx } from './canvas';
import { Color, COLOR_BLACK } from './color';
import { CanvasContext, DrawTextParams } from '../types';

const DEFAULT_TEXT_PARAMS: DrawTextParams = {
  font: 'monospace',
  color: COLOR_BLACK,
  size: 14,
  align: 'center',
  strokeColor: 'black',
};

// FIXME: refactor for drawing only outlines
export const drawRect = (
  x: number,
  y: number,
  w: number,
  h: number,
  fillColor: Color,
  outlineColor?: Color,
  ctx?: CanvasContext,
) => {
  ctx = ctx ?? getGlobalCtx();
  ctx.fillStyle = fillColor.name;
  ctx.fillRect(x, y, w, h);

  if (outlineColor) {
    ctx.strokeStyle = outlineColor.name;
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, w, h);
  }
};

interface DrawCircleParams {
  x: number;
  y: number;
  r: number;
  fillColor?: Color;
  outlineColor: Color;
  ctx?: CanvasContext;
}

export const drawCircle = ({
  x,
  y,
  r,
  fillColor,
  outlineColor,
  ctx,
}: DrawCircleParams) => {
  ctx = ctx ?? getGlobalCtx();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);

  ctx.strokeStyle = outlineColor.name;
  ctx.lineWidth = 4;
  ctx.stroke();

  if (fillColor) {
    ctx.fillStyle = fillColor.name;
    ctx.fill();
  }

  ctx.closePath();
};

// TODO: It would be nice to have fixed locations for the text to appear
export const drawText = (
  text: string,
  x: number,
  y: number,
  textParams?: DrawTextParams,
  ctx?: CanvasContext,
) => {
  ctx = ctx ?? getGlobalCtx();

  const { font, size, color, align, strokeColor } = {
    ...DEFAULT_TEXT_PARAMS,
    ...(textParams ?? {}),
  };

  ctx.font = `${size}px ${font}`;
  ctx.textAlign = align as CanvasTextAlign;
  ctx.textBaseline = 'middle';
  ctx.strokeStyle = strokeColor as string; // Might want to change this
  ctx.lineWidth = 4;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = (color as Color).name;
  ctx.fillText(text, x, y);
};
