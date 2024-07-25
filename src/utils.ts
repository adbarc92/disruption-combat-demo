import { Position } from './model/types';

export const normalize = (
  x: number,
  a: number,
  b: number,
  c: number,
  d: number,
) => {
  return c + ((x - a) * (d - c)) / (b - a);
};

export const handleLoopedArrayIndexing = (
  currentPosition: number,
  increment: number,
  limit: number,
): number => {
  const result = currentPosition + increment;
  if (result < 0) {
    return limit - 1;
  } else if (result >= limit) {
    return 0;
  } else {
    return result % limit;
  }
};

interface RotatePointParams {
  x: number;
  y: number;
  cx: number;
  cy: number;
  angle: number;
}

export const rotatePoint = ({
  x,
  y,
  cx,
  cy,
  angle,
}: RotatePointParams): Position => {
  // Convert angle to radians
  var radians = (angle * Math.PI) / 180;

  var translatedX = x - cx;
  var translatedY = y - cy;

  // Calculate new coordinates
  var xNew = translatedX * Math.cos(radians) - translatedY * Math.sin(radians);
  var yNew = translatedX * Math.sin(radians) + translatedY * Math.cos(radians);

  // Translate back
  xNew += cx;
  yNew += cy;

  // Return the new coordinates as an object
  return { x: xNew, y: yNew };
};
