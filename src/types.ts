export interface Dimensions {
  width: number;
  height: number;
}

export interface OptionalDimensions {
  width: number | undefined;
  height: number | undefined;
}

export interface CanvasSpecs {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasContext;
}

export type CanvasContext = CanvasRenderingContext2D;
