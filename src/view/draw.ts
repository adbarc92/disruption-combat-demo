/**
 * Functions for drawing shapes and text to the canvas.
 */
import { Color, COLOR_BLACK, COLOR_WHITE } from './color';
import { CanvasContext, Position, TextParams } from '../model/types';
import { rotatePoint } from '../utils';

export const DEFAULT_TEXT_PARAMS: TextParams = {
  font: 'monospace',
  fillColor: COLOR_WHITE,
  size: 14,
  align: 'center',
  outlineColor: COLOR_BLACK,
};

interface DrawRectParams {
  x: number;
  y: number;
  w: number;
  h: number;
  outlineColor: Color;
  fillColor?: Color;
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

interface DrawTriangleParams {
  firstPoint: Position;
  secondPoint: Position;
  thirdPoint: Position;
  outlineColor: Color;
  fillColor?: Color;
  ctx: CanvasContext;
}

export const drawTriangle = ({
  firstPoint,
  secondPoint,
  thirdPoint,
  outlineColor,
  fillColor,
  ctx,
}: DrawTriangleParams) => {
  ctx.strokeStyle = outlineColor.hexCode;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(firstPoint.x, firstPoint.y);
  ctx.lineTo(secondPoint.x, secondPoint.y);
  ctx.lineTo(thirdPoint.x, thirdPoint.y);
  ctx.lineTo(firstPoint.x, firstPoint.y);
  ctx.stroke();
  if (fillColor) {
    ctx.fillStyle = fillColor.hexCode;
    ctx.fill();
  }
};

interface DrawIsoscelesTriangleParams {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  outlineColor: Color;
  fillColor?: Color;
  ctx: CanvasContext;
}

export const drawIsoscelesTriangle = ({
  centerX,
  centerY,
  width,
  height,
  outlineColor,
  fillColor,
  ctx,
}: DrawIsoscelesTriangleParams) => {
  const firstPoint = { x: centerX - width / 2, y: centerY + height / 2 };
  const secondPoint = { x: centerX, y: centerY - height / 2 };
  const thirdPoint = { x: centerX + width / 2, y: centerY + height / 2 };
  drawTriangle({
    firstPoint,
    secondPoint,
    thirdPoint,
    outlineColor,
    fillColor,
    ctx,
  });
};

interface DrawRotatedTriangleParams {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  outlineColor: Color;
  fillColor?: Color;
  ctx: CanvasContext;
  angle: number;
}

export const drawRotatedTriangle = ({
  centerX,
  centerY,
  width,
  height,
  outlineColor,
  fillColor,
  ctx,
  angle,
}: DrawRotatedTriangleParams) => {
  const firstPoint = rotatePoint({
    x: centerX - width / 2,
    y: centerY + height / 2,
    cx: centerX,
    cy: centerY,
    angle,
  });

  const secondPoint = rotatePoint({
    x: centerX,
    y: centerY - height / 2,
    cx: centerX,
    cy: centerY,
    angle,
  });

  const thirdPoint = rotatePoint({
    x: centerX + width / 2,
    y: centerY + height / 2,
    cx: centerX,
    cy: centerY,
    angle,
  });

  drawTriangle({
    firstPoint,
    secondPoint,
    thirdPoint,
    outlineColor,
    fillColor,
    ctx,
  });
};

interface DrawTextParams {
  text: string;
  x: number;
  y: number;
  ctx: CanvasContext;
  textParams?: TextParams;
}

// TODO: It would be nice to have fixed locations for the text to appear
export const drawText = ({ text, x, y, ctx, textParams }: DrawTextParams) => {
  const { font, size, fillColor, align, outlineColor } = {
    ...DEFAULT_TEXT_PARAMS,
    ...(textParams ?? {}),
  };

  ctx.font = `${size}px ${font}`;
  ctx.textAlign = align as CanvasTextAlign;
  ctx.textBaseline = 'middle';
  ctx.strokeStyle = outlineColor.hexCode; // Might want to change this
  ctx.lineWidth = 4;
  ctx.strokeText(text, x, y);
  if (fillColor) {
    ctx.fillStyle = (fillColor as Color).name;
    ctx.fillText(text, x, y);
  }
};

interface ClearCanvasParams {
  canvas: HTMLCanvasElement;
}

export const clearCanvas = ({ canvas }: ClearCanvasParams) => {
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
