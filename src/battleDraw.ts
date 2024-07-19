// TODO: draw battle arena

import { Color } from './color';
import { drawRect } from './draw';
import { CanvasContext } from './types';

export const drawBattleArena = (
  centerX: number,
  centerY: number,
  squareSide: number,
  squareFillColor: Color,
  squareOutlineColor: Color,
  ctx: CanvasContext,
) => {
  // This will be a 2D array. It starts at centerX - 1.5 * squareSide
  const startX = centerX - 1.5 * squareSide;
  const startY = centerY - 1.5 * squareSide;
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      drawRect(
        startX + x * squareSide,
        startY + y * squareSide,
        squareSide,
        squareSide,
        squareFillColor,
        squareOutlineColor,
        ctx,
      );
    }
  }
};

// TODO: draw input menu

// TODO: draw battle log
