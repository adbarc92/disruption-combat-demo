import { Color } from '../view/color';
import { Game } from './game';

export interface Dimensions {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface CanvasSpecs {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasContext;
}

export type CanvasContext = CanvasRenderingContext2D;

export interface TextParams {
  font?: string;
  outlineColor: Color;
  fillColor?: Color;
  size?: number;
  align?: 'left' | 'center' | 'right';
}

export interface RectangleSpecs {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

export enum GridSpaceStatus {
  BURNING,
  FROZEN,
  WET,
  ROCKY,
  RESONANT,
  SILENT,
  OILY,
}

export interface GridSpaceStatusAndColor {
  status: GridSpaceStatus;
  color: Color;
}

export interface BattleGridSpecs extends RectangleSpecs {
  statuses: GridSpaceStatus[];
}

export interface Window {
  game: Game;
}
