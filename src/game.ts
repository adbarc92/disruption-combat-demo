import {
  createBattleGridSpecs,
  drawCircleOnGrid,
  drawGridFromSpecs,
} from './draw/battleDraw';
import { clearCanvas } from './draw/canvas';
import { COLOR_BLACK, COLOR_GREEN, COLOR_WHITE } from './draw/color';
import { drawText } from './draw/draw';
import { gameLoop } from './loop';
import {
  BattleGridSpecs,
  CanvasContext,
  GridSpaceStatus,
  Position,
} from './types';
import { handleLoopedArrayIndexing } from './utils';

/**
 * Game class should ultimately contain:
 * * Controller/input config
 * * Save state
 * * Battle state
 * * Game running state
 * * Menu stack state
 */
export class Game {
  ctx: CanvasContext;
  gridSpecs: BattleGridSpecs[][];
  circlePosition: Position;

  constructor(ctx: CanvasContext) {
    this.ctx = ctx;

    const centerX = this.ctx.canvas.width / 2;
    const centerY = this.ctx.canvas.height / 2;
    const squareSide = 100;
    this.gridSpecs = createBattleGridSpecs(centerX, centerY, squareSide, 3, 3);

    this.circlePosition = { x: 0, y: 0 };
  }

  async start() {
    gameLoop(this);
  }

  clearCanvas() {
    clearCanvas(this.ctx.canvas);
  }

  draw() {
    drawText(
      'Disruption Combat Demo',
      this.ctx.canvas.width / 2 - 50,
      120,
      this.ctx,
      { color: COLOR_WHITE, align: 'center' },
    );

    drawGridFromSpecs({
      gridSpecs: this.gridSpecs,
      fillColor: undefined,
      outlineColor: COLOR_BLACK,
      ctx: this.ctx,
    });

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

  toggleFirstRowStatuses() {
    this.gridSpecs.forEach((gridSpec) => {
      if (gridSpec[0].statuses.length) {
        gridSpec[0].statuses = [];
      } else {
        const burning = GridSpaceStatus.BURNING;
        gridSpec[0].statuses = [burning];
      }
    });
  }

  handleEnter() {
    this.toggleFirstRowStatuses();
  }
}
