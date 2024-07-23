// const ACTIONS = ['ATTACK', 'DEFEND', 'MOVE', 'TECH', 'ITEM', 'EQUIP', 'USE'];

import { CanvasContext } from '../model/types';
import { COLOR_BLACK, COLOR_WHITE } from './color';
import { drawRect, drawText } from './draw';

const TEST_ACTIONS = [
  'ATTACK',
  'DEFEND',
  'MOVE',
  'TECH',
  'ITEM',
  'EQUIP',
  'USE',
];

// Starting at the bottom of the screen, display the menu

interface DrawMenuParams {
  ctx: CanvasContext;
}

// Order of priority: render menu
// Render cursor
// Add mouse support (track interactable elements in game class, check for collisions)
// Make menu scrollable

export const drawMenu = ({ ctx }: DrawMenuParams) => {
  // Draw a rectangle
  drawRect({
    x: ctx.canvas.width / 2 - 80,
    y: ctx.canvas.height - 225,
    w: 160,
    h: 200,
    outlineColor: COLOR_BLACK,
    ctx,
  });

  TEST_ACTIONS.forEach((action, i) => {
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
