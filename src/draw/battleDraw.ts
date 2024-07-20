// TODO: draw battle arena

import { Color } from './color';
import { drawRect } from './draw';
import { CanvasContext, RectangleSpecs } from '../types';

export const drawSquareGrid = (
  centerX: number,
  centerY: number,
  squareSide: number,
  squareFillColor: Color,
  squareOutlineColor: Color,
  ctx: CanvasContext,
  gridWidth: number = 3,
  gridHeight: number = 3,
) => {
  // This will be a 2D array. It starts at centerX - 1.5 * squareSide
  const startX = centerX - (gridWidth / 2) * squareSide;
  const startY = centerY - (gridHeight / 2) * squareSide;
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
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

export const drawGridFromRectangleSpecs = (
  gridSpecs: RectangleSpecs[][],
  squareFillColor: Color,
  squareOutlineColor: Color,
  ctx: CanvasContext,
) => {
  gridSpecs.forEach((column) => {
    column.forEach((row) => {
      // Add mouseover listener
      drawRect(
        row.startX,
        row.startY,
        row.width,
        row.height,
        squareFillColor,
        squareOutlineColor,
        ctx,
      );
    });
  });
};

export const createCanvasSetFromGridSpecs = (
  gridSpecs: RectangleSpecs[][],
  squareFillColor: Color,
  squareOutlineColor: Color,
): HTMLCanvasElement[] => {
  const canvases: HTMLCanvasElement[] = [];
  // Iterate through, creating a new canvas element with a hover event.
  gridSpecs.forEach((column) => {
    column.forEach((row) => {
      const newCanvas = document.createElement('canvas');
    });
  });

  return canvases;
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
  const grid: RectangleSpecs[][] = [[]];
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
