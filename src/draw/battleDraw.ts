// TODO: draw battle arena

import { Color } from './color';
import { drawCircle, drawRect } from './draw';
import { CanvasContext, Position, RectangleSpecs } from '../types';

export const drawSquareGrid = (
  centerX: number,
  centerY: number,
  squareSide: number,
  fillColor: Color,
  outlineColor: Color,
  ctx: CanvasContext,
  gridWidth: number = 3,
  gridHeight: number = 3,
) => {
  // This will be a 2D array. It starts at centerX - 1.5 * squareSide
  const startX = centerX - (gridWidth / 2) * squareSide;
  const startY = centerY - (gridHeight / 2) * squareSide;
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      drawRect({
        x: startX + x * squareSide,
        y: startY + y * squareSide,
        w: squareSide,
        h: squareSide,
        fillColor,
        outlineColor,
        ctx,
      });
    }
  }
};

interface DrawGridFromRectangleSpecsParams {
  gridSpecs: RectangleSpecs[][];
  fillColor?: Color;
  outlineColor: Color;
  ctx: CanvasContext;
}

export const drawGridFromRectangleSpecs = ({
  gridSpecs,
  fillColor,
  outlineColor,
  ctx,
}: DrawGridFromRectangleSpecsParams) => {
  gridSpecs.forEach((column) => {
    column.forEach((row) => {
      drawRect({
        x: row.startX,
        y: row.startY,
        w: row.width,
        h: row.height,
        fillColor,
        outlineColor,
        ctx,
      });
    });
  });
};

interface DrawCircleOnGridParams {
  circlePosition: Position;
  gridSpecs: RectangleSpecs[][];
  fillColor?: Color;
  outlineColor: Color;
  ctx: CanvasContext;
}

export const drawCircleOnGrid = ({
  circlePosition,
  gridSpecs,
  fillColor,
  outlineColor,
  ctx,
}: DrawCircleOnGridParams) => {
  const { x, y } = positionToCanvasCoordinates(circlePosition, gridSpecs);
  drawCircle({ x, y, r: 40, fillColor, outlineColor, ctx });
};

const positionToCanvasCoordinates = (
  circlePosition: Position,
  gridSpecs: RectangleSpecs[][],
): Position => {
  const gridItem = gridSpecs[circlePosition.y][circlePosition.x];
  return {
    x: gridItem.startX + gridItem.width / 2,
    y: gridItem.startY + gridItem.height / 2,
  };
};

// Calculate the grid's squares, then return them in a 2D array
export const createSquareGridSpecs = (
  centerX: number,
  centerY: number,
  squareSide: number,
  gridWidth: number = 3,
  gridHeight: number = 3,
): RectangleSpecs[][] => {
  const startX = centerX - (gridWidth / 2) * squareSide;
  const startY = centerY - (gridHeight / 2) * squareSide;
  const grid: RectangleSpecs[][] = Array();
  for (let y = 0; y < gridHeight; y++) {
    const gridX: RectangleSpecs[] = [];
    for (let x = 0; x < gridWidth; x++) {
      gridX.push({
        startX: startX + x * squareSide,
        startY: startY + y * squareSide,
        width: squareSide,
        height: squareSide,
      });
    }
    grid.push(gridX);
  }
  return grid;
};

// TODO: draw input menu

// TODO: draw battle log
