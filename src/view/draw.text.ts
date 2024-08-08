import { CanvasContext, TextParams } from '../model/types';
import { Color, COLOR_BLACK, COLOR_WHITE } from './color';

export const DEFAULT_TEXT_PARAMS: TextParams = {
  font: 'monospace',
  fillColor: COLOR_WHITE,
  size: 14,
  align: 'center',
  outlineColor: COLOR_BLACK,
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
