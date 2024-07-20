import {
  createSquareGridSpecs,
  drawGridFromRectangleSpecs,
} from './draw/battleDraw';
import { COLOR_BLACK, COLOR_RED, COLOR_WHITE } from './draw/color';
import { drawText } from './draw/draw';
import { gameLoop } from './loop';
import { CanvasContext, Position, RectangleSpecs } from './types';

export class Game {
  ctx: CanvasContext;
  gridSpecs: RectangleSpecs[][];
  circlePosition: Position;

  constructor(ctx: CanvasContext) {
    this.ctx = ctx;

    const centerX = this.ctx.canvas.width / 2;
    const centerY = this.ctx.canvas.height / 2;
    const squareSide = 100;
    this.gridSpecs = createSquareGridSpecs(centerX, centerY, squareSide, 4, 6);

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
  }

  async load() {
    console.log('Loading game...');
    // FIXME: Load sprites
    console.log('Loaded sprites.');
    console.log('Loading database...');
    // FIXME: Load database
    console.log('Loaded database.');
  }
}
