import {
  createBattleGridSpecs,
  drawCircleOnGrid,
  drawGridFromSpecs,
} from '../view/battleDraw';
import {
  clearCanvas,
  drawIsoscelesTriangle,
  drawRotatedTriangle,
} from '../view/draw';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_PURPLE,
  COLOR_WHITE,
} from '../view/color';
import { drawText } from '../view/draw';
import { gameLoop } from '../controller/loop';
import {
  BattleGridSpecs,
  CanvasContext,
  GridSpaceStatus,
  Position,
} from '../model/types';
import { handleLoopedArrayIndexing } from '../utils';
import { drawMenu as drawBattleInputMenu } from '../view/battleMenu';

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
  gridCursorPosition: Position;
  battleMenuCursorPosition: number;

  constructor(ctx: CanvasContext) {
    this.ctx = ctx;

    const centerX = this.ctx.canvas.width / 2;
    const centerY = this.ctx.canvas.height / 2;
    const squareSide = 100;
    this.gridSpecs = createBattleGridSpecs(centerX, centerY, squareSide, 3, 3);

    this.gridCursorPosition = { x: 0, y: 0 };
    this.battleMenuCursorPosition = 0;
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
      circlePosition: this.gridCursorPosition,
      gridSpecs: this.gridSpecs,
      outlineColor: COLOR_GREEN,
      fillColor: undefined,
      ctx: this.ctx,
    });

    drawBattleInputMenu({ ctx: this.ctx });

    drawRotatedTriangle({
      centerX: this.ctx.canvas.width / 2,
      centerY: this.ctx.canvas.height / 2,
      width: 100,
      height: 200,
      outlineColor: COLOR_BLUE,
      fillColor: COLOR_PURPLE,
      ctx: this.ctx,
      angle: 90,
    });
  }

  /**
   * Input routing methods
   */

  handleArrowUp() {
    this.gridCursorUp();
  }

  handleArrowDown() {
    this.gridCursorDown();
  }

  handleArrowRight() {
    this.gridCursorRight();
  }

  handleArrowLeft() {
    this.gridCursorLeft();
  }

  /**
   * Grid Cursor Methods
   */

  gridCursorUp() {
    this.gridCursorPosition = {
      x: this.gridCursorPosition.x,
      y: handleLoopedArrayIndexing(
        this.gridCursorPosition.y,
        -1,
        this.gridSpecs.length,
      ),
    };
  }

  gridCursorDown() {
    this.gridCursorPosition = {
      x: this.gridCursorPosition.x,
      y: handleLoopedArrayIndexing(
        this.gridCursorPosition.y,
        1,
        this.gridSpecs.length,
      ),
    };
  }

  gridCursorRight() {
    this.gridCursorPosition = {
      x: handleLoopedArrayIndexing(
        this.gridCursorPosition.x,
        1,
        this.gridSpecs[this.gridCursorPosition.y].length,
      ),
      y: this.gridCursorPosition.y,
    };
  }

  gridCursorLeft() {
    this.gridCursorPosition = {
      x: handleLoopedArrayIndexing(
        this.gridCursorPosition.x,
        -1,
        this.gridSpecs[this.gridCursorPosition.y].length,
      ),
      y: this.gridCursorPosition.y,
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
    const { x, y } = this.gridCursorPosition;
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
