import {
  createBattleGridSpecs,
  drawGridFromSpecs,
  drawSquareGrid,
} from './battleDraw';
import { COLOR_BLACK, COLOR_BLUE, COLOR_RED, COLOR_WHITE } from './color';
import { drawCircle, drawRect, drawText } from './draw';
import { CanvasContext } from '../model/types';
import { BATTLE_ACTIONS } from '../model/game';

// export const testShapes = (
//   canvasWidth: number,
//   canvasHeight: number,
//   ctx: CanvasContext,
// ) => {
//   const centerX = canvasWidth / 2;
//   const centerY = canvasHeight / 2;
//   const squareSize = 100;

//   drawRect(
//     centerX - squareSize,
//     centerY - squareSize,
//     squareSize,
//     squareSize,
//     COLOR_BLACK,
//     COLOR_BLUE,
//     ctx,
//   );

//   drawCircle(
//     centerX - squareSize / 2,
//     centerY - squareSize / 2,
//     squareSize / 2 - 10,
//     COLOR_BLACK,
//     COLOR_RED,
//     ctx,
//   );
// };

// export const testText = (
//   canvasWidth: number,
//   canvasHeight: number,
//   ctx: CanvasContext,
// ) => {
//   drawText(
//     'Disruption Combat Demo',
//     canvasWidth / 2 - 50,
//     120,
//     { color: COLOR_WHITE, align: 'center' },
//     ctx,
//   );
// };

// export const testDrawRectGrid = (
//   canvasWidth: number,
//   canvasHeight: number,
//   ctx: CanvasContext,
// ) => {
//   const centerX = canvasWidth / 2;
//   const centerY = canvasHeight / 2;
//   const squareSize = 100;

//   drawSquareGrid(
//     centerX,
//     centerY,
//     squareSize,
//     COLOR_BLACK,
//     COLOR_BLUE,
//     ctx,
//     3,
//     3,
//   );
// };

// export const testRectSpecsGrid = (
//   canvasWidth: number,
//   canvasHeight: number,
//   ctx: CanvasContext,
// ) => {
//   const centerX = canvasWidth / 2;
//   const centerY = canvasHeight / 2;
//   const squareSide = 100;

//   const gridSpecs = createBattleGridSpecs(centerX, centerY, squareSide, 4, 6);

//   drawGridFromRectangleSpecs(gridSpecs, COLOR_BLACK, COLOR_RED, ctx);
// };

// export const drawMidlines = (
//   canvasWidth: number,
//   canvasHeight: number,
//   ctx: CanvasContext,
// ) => {
//   ctx.strokeStyle = COLOR_BLACK.name;
//   ctx.beginPath();
//   ctx.moveTo(0, canvasHeight / 2);
//   ctx.lineTo(canvasWidth, canvasHeight / 2);
//   ctx.stroke();

//   ctx.beginPath();
//   ctx.moveTo(canvasWidth / 2, 0);
//   ctx.lineTo(canvasWidth / 2, canvasHeight);
//   ctx.stroke();
// };

interface DrawBattleInputMenuParams {
  ctx: CanvasContext;
}

export const drawBattleInputMenu = ({ ctx }: DrawBattleInputMenuParams) => {
  // Draw a rectangle
  drawRect({
    x: ctx.canvas.width / 2 - 80,
    y: ctx.canvas.height - 225,
    w: 160,
    h: 200,
    outlineColor: COLOR_BLACK,
    ctx,
  });

  BATTLE_ACTIONS.forEach((action, i) => {
    drawText({
      text: action,
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height - (200 - 25 * i),
      ctx,
      textParams: {
        outlineColor: COLOR_BLACK,
        fillColor: COLOR_WHITE,
        size: 20,
      },
    });
  });
};
