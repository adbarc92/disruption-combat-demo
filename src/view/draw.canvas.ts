import { CanvasContext } from '../model/types';
import { COLOR_WHITE } from './color';
import { drawRect } from './draw.shape';

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
