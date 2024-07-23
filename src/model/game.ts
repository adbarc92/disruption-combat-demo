import {
  createBattleGridSpecs,
  drawCircleOnGrid,
  drawGridFromSpecs,
} from '../view/battleDraw';
import { clearCanvas } from '../view/draw';
import { COLOR_BLACK, COLOR_GREEN, COLOR_WHITE } from '../view/color';
import { drawText } from '../view/draw';
import { gameLoop } from '../controller/loop';
import {
  BattleGridSpecs,
  CanvasContext,
  GridSpaceStatus,
  Position,
} from '../model/types';
import { handleLoopedArrayIndexing } from '../utils';
import { drawMenu } from '../view/battleMenu';

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
    clearCanvas({ canvas: this.ctx.canvas });
  }

  draw() {
    drawText({
      text: 'Disruption Combat Demo',
      x: this.ctx.canvas.width / 2,
      y: 30,
      ctx: this.ctx,
      textParams: { outlineColor: COLOR_BLACK, align: 'center', size: 30 },
    });

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

    drawMenu({ ctx: this.ctx });
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
        gridSpec[0].statuses = [
          GridSpaceStatus.BURNING,
          GridSpaceStatus.OILY,
          GridSpaceStatus.RESONANT,
        ];
      }
    });
  }

  toggleCursorSpaceStatuses() {
    const { x, y } = this.circlePosition;
    const currentStatuses = this.gridSpecs[y][x].statuses;
    if (currentStatuses.length === 0) {
      this.gridSpecs[y][x].statuses = [
        GridSpaceStatus.BURNING,
        GridSpaceStatus.OILY,
        GridSpaceStatus.RESONANT,
      ];
    } else {
      this.gridSpecs[y][x].statuses = [];
    }
  }

  handleEnter() {
    this.toggleCursorSpaceStatuses();
  }

  handleInsert() {
    this.toggleFirstRowStatuses();
  }
}
