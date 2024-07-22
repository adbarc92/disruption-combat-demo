// TODO: draw battle arena

import {
  Color,
  COLOR_BLACK,
  COLOR_BROWN,
  COLOR_DARKBLUE,
  COLOR_LIGHTBLUE,
  COLOR_ORANGE,
  COLOR_PURPLE,
  COLOR_WHITE,
  COLOR_YELLOW,
} from './color';
import { drawCircle, drawRect } from './draw';
import {
  BattleGridSpecs,
  CanvasContext,
  GridSpaceStatus,
  Position,
  RectangleSpecs,
} from '../model/types';

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
  gridSpecs: BattleGridSpecs[][];
  fillColor?: Color;
  outlineColor: Color;
  ctx: CanvasContext;
}

export const drawGridFromSpecs = ({
  gridSpecs,
  fillColor,
  outlineColor,
  ctx,
}: DrawGridFromRectangleSpecsParams) => {
  gridSpecs.forEach((column) => {
    column.forEach((space) => {
      drawRect({
        x: space.startX,
        y: space.startY,
        w: space.width,
        h: space.height,
        fillColor,
        outlineColor,
        ctx,
      });

      space.statuses.forEach((status, i) => {
        const color = statusToColor(status);
        drawCircle({
          x: space.startX + space.width / 2,
          y: space.startY + space.height / 2,
          r: calculateStatusCircleRadiusByIndex(i),
          outlineColor: color,
          fillColor: color,
          ctx,
        });
      });
    });
  });
};

// FIXME: This should probably be more complicated eventually
const calculateStatusCircleRadiusByIndex = (i: number): number => {
  return 30 - i * 10;
};

const statusToColor = (status: GridSpaceStatus): Color => {
  switch (status) {
    case GridSpaceStatus.BURNING:
      return COLOR_ORANGE;
    case GridSpaceStatus.FROZEN:
      return COLOR_LIGHTBLUE;
    case GridSpaceStatus.WET:
      return COLOR_DARKBLUE;
    case GridSpaceStatus.ROCKY:
      return COLOR_BROWN;
    case GridSpaceStatus.RESONANT:
      return COLOR_PURPLE;
    case GridSpaceStatus.SILENT:
      return COLOR_YELLOW;
    case GridSpaceStatus.OILY:
      return COLOR_BLACK;
    default:
      return COLOR_WHITE;
  }
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

export const createBattleGridSpecs = (
  centerX: number,
  centerY: number,
  squareSide: number,
  gridWidth: number = 3,
  gridHeight: number = 3,
): BattleGridSpecs[][] => {
  const startX = centerX - (gridWidth / 2) * squareSide;
  const startY = centerY - (gridHeight / 2) * squareSide;
  const grid: BattleGridSpecs[][] = Array();
  for (let y = 0; y < gridHeight; y++) {
    const gridX: BattleGridSpecs[] = [];
    for (let x = 0; x < gridWidth; x++) {
      gridX.push({
        startX: startX + x * squareSide,
        startY: startY + y * squareSide,
        width: squareSide,
        height: squareSide,
        statuses: [],
      });
    }
    grid.push(gridX);
  }
  return grid;
};

// TODO: draw input menu

// TODO: draw battle log
