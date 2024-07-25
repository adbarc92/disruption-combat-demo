import {
  createBattleGridSpecs,
  drawCircleOnGrid,
  drawGridFromSpecs,
} from '../view/battleDraw';
import { clearCanvas } from '../view/draw';
import { COLOR_BLACK, COLOR_GREEN } from '../view/color';
import { drawText } from '../view/draw';
import { gameLoop } from '../controller/loop';
import {
  BattleGridSpecs,
  BattleInputMenuSpecs,
  CanvasContext,
  GridSpaceStatus,
  Position,
} from '../model/types';
import { handleLoopedArrayIndexing } from '../utils';
import {
  createBattleInputMenuSpecs,
  drawBattleInputMenuFromSpecs,
} from '../view/battleMenu';

/**
 * Game class should ultimately contain:
 * * Controller/input config
 * * Save state
 * * Battle state
 * * Game running state
 * * Menu stack state
 */

export const BATTLE_ACTIONS = [
  'ATTACK',
  'DEFEND',
  'MOVE',
  'TECH',
  'ITEM',
  'EQUIP',
  'USE',
];

export class Game {
  ctx: CanvasContext;
  gridSpecs: BattleGridSpecs[][];
  battleInputMenuSpecs: BattleInputMenuSpecs;
  gridCursorPosition: Position;
  battleMenuCursorPosition: number;

  constructor(ctx: CanvasContext) {
    this.ctx = ctx;

    const centerX = this.ctx.canvas.width / 2;
    const centerY = this.ctx.canvas.height / 2;
    const squareSide = 100;
    this.gridSpecs = createBattleGridSpecs(centerX, centerY, squareSide, 3, 3);
    this.battleInputMenuSpecs = createBattleInputMenuSpecs({
      ctx: this.ctx,
      actions: BATTLE_ACTIONS,
    });

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
    const { ctx, gridSpecs, battleInputMenuSpecs, gridCursorPosition } = this;

    drawText({
      text: 'Disruption Combat Demo',
      x: ctx.canvas.width / 2,
      y: 30,
      ctx,
      textParams: { outlineColor: COLOR_BLACK, align: 'center', size: 30 },
    });

    drawGridFromSpecs({
      gridSpecs,
      fillColor: undefined,
      outlineColor: COLOR_BLACK,
      ctx,
    });

    drawCircleOnGrid({
      gridCursorPosition,
      gridSpecs,
      outlineColor: COLOR_GREEN,
      fillColor: undefined,
      ctx,
    });

    drawBattleInputMenuFromSpecs({
      ctx,
      battleInputMenuSpecs,
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
