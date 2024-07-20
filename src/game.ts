import {
  createSquareGridSpecs,
  drawCircleOnGrid,
  drawGridFromRectangleSpecs,
} from './draw/battleDraw';
import { clearCanvas } from './draw/canvas';
import { COLOR_BLACK, COLOR_GREEN, COLOR_RED, COLOR_WHITE } from './draw/color';
import { drawText } from './draw/draw';
import { gameLoop } from './loop';
import { CanvasContext, Position, RectangleSpecs } from './types';
import { handleLoopedArrayIndexing } from './utils';

export class Game {
  ctx: CanvasContext;
  gridSpecs: RectangleSpecs[][];
  circlePosition: Position;

  constructor(ctx: CanvasContext) {
    this.ctx = ctx;

    const centerX = this.ctx.canvas.width / 2;
    const centerY = this.ctx.canvas.height / 2;
    const squareSide = 100;
    this.gridSpecs = createSquareGridSpecs(centerX, centerY, squareSide, 3, 3);

    this.circlePosition = { x: 0, y: 0 };

    // window.game = this; // FIXME Remove after debugging
  }
  // controller config
  // save state
  // battle state
  // game state: running, paused, quit
  // Menu state: which are displayed, their ordering, and the cursor position
  // Canvas
  async start() {
    gameLoop(this);
    // this.draw();
  }

  clearCanvas() {
    clearCanvas(this.ctx.canvas);
  }

  draw() {
    drawText(
      'Disruption Combat Demo',
      this.ctx.canvas.width / 2 - 50,
      120,
      { color: COLOR_WHITE, align: 'center' },
      this.ctx,
    );

    drawGridFromRectangleSpecs(
      this.gridSpecs,
      COLOR_BLACK,
      COLOR_RED,
      this.ctx,
    );

    drawCircleOnGrid({
      circlePosition: this.circlePosition,
      gridSpecs: this.gridSpecs,
      outlineColor: COLOR_GREEN,
      fillColor: undefined,
      ctx: this.ctx,
    });
  }

  handleArrowUp() {
    this.circlePosition = {
      x: this.circlePosition.x,
      y: handleLoopedArrayIndexing(
        this.circlePosition.y,
        -1,
        this.gridSpecs.length,
      ),
    };
  }

  handleArrowDown() {
    this.circlePosition = {
      x: this.circlePosition.x,
      y: handleLoopedArrayIndexing(
        this.circlePosition.y,
        1,
        this.gridSpecs.length,
      ),
    };
  }

  handleArrowRight() {
    this.circlePosition = {
      x: handleLoopedArrayIndexing(
        this.circlePosition.x,
        1,
        this.gridSpecs[this.circlePosition.y].length,
      ),
      y: this.circlePosition.y,
    };
  }

  handleArrowLeft() {
    this.circlePosition = {
      x: handleLoopedArrayIndexing(
        this.circlePosition.x,
        -1,
        this.gridSpecs[this.circlePosition.y].length,
      ),
      y: this.circlePosition.y,
    };
  }
}
