import { Color } from './color';

export interface Dimensions {
  width: number;
  height: number;
}

export interface CanvasSpecs {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasContext;
}

export type CanvasContext = CanvasRenderingContext2D;

export interface DrawTextParams {
  font?: string;
  color?: Color;
  size?: number;
  align?: 'left' | 'center' | 'right';
  strokeColor?: string;
}

export interface RectangleSpecs {
  startX: number;
  startY: number;
  width: number;
  height: number;
}
