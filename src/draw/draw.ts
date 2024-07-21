/**
 * Functions for drawing shapes and text to the canvas.
 */
import { Color, COLOR_BLACK } from './color';
import { CanvasContext, DrawTextParams } from '../types';

const DEFAULT_TEXT_PARAMS: DrawTextParams = {
  font: 'monospace',
  color: COLOR_BLACK,
  size: 14,
  align: 'center',
  strokeColor: 'black',
};

interface DrawRectParams {
  x: number;
  y: number;
  w: number;
  h: number;
  fillColor?: Color;
  outlineColor: Color;
  ctx: CanvasContext;
}

export const drawRect = ({
  x,
  y,
  w,
  h,
  fillColor,
  outlineColor,
  ctx,
}: DrawRectParams) => {
  ctx.strokeStyle = outlineColor.hexCode;
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, w, h);

  if (fillColor) {
    ctx.fillStyle = fillColor.hexCode;
    ctx.fillRect(x, y, w, h);
  }
};

interface DrawCircleParams {
  x: number;
  y: number;
  r: number;
  fillColor?: Color;
  outlineColor: Color;
  ctx: CanvasContext;
}

export const drawCircle = ({
  x,
  y,
  r,
  fillColor,
  outlineColor,
  ctx,
}: DrawCircleParams) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);

  ctx.strokeStyle = outlineColor.hexCode;
  ctx.lineWidth = 4;
  ctx.stroke();

  if (fillColor) {
    ctx.fillStyle = fillColor.hexCode;
    ctx.fill();
  }

  ctx.closePath();
};

// TODO: It would be nice to have fixed locations for the text to appear
export const drawText = (
  text: string,
  x: number,
  y: number,
  ctx: CanvasContext,
  textParams?: DrawTextParams,
) => {
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
