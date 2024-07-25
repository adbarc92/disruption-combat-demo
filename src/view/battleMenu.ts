import { BATTLE_ACTIONS } from '../model/game';
import {
  BattleInputMenuSpecs,
  BattleInputTextSpecs,
  CanvasContext,
  TextParams,
} from '../model/types';
import { Color, COLOR_BLACK, COLOR_WHITE } from './color';
import { DEFAULT_TEXT_PARAMS, drawRect, drawText } from './draw';

// Starting at the bottom of the screen, display the menu

// Order of priority: render menu
// Render cursor
// Add mouse support (track interactable elements in game class, check for collisions)
// Make menu scrollable

interface CreateBattleInputMenuSpecsParams {
  ctx: CanvasContext;
  actions: string[];
}

export const createBattleInputMenuSpecs = ({
  ctx,
  actions,
}: CreateBattleInputMenuSpecsParams): BattleInputMenuSpecs => {
  // FIXME: Resize for text size
  const x = ctx.canvas.width / 2 - 80;
  const y = ctx.canvas.height - 225; // Should be derivable based on battle grid
  const w = 160;
  const h = 200;

  const textSpecs: BattleInputTextSpecs[] = actions.map((action, i) => {
    const textMeasurement = ctx.measureText(action);
    return {
      text: action,
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height - (200 - 25 * i),
      wPx: textMeasurement.width,
      // FIXME: this might be totally wrong, but I probably won't need this
      hPx:
        textMeasurement.actualBoundingBoxDescent -
        textMeasurement.actualBoundingBoxAscent,
    };
  });

  return { x, y, w, h, textSpecs };
};

interface DrawBattleInputMenuFromSpecsParams {
  ctx: CanvasContext;
  textParams?: TextParams;
  battleInputMenuSpecs: BattleInputMenuSpecs;
  menuOutlineColor?: Color;
}

export const drawBattleInputMenuFromSpecs = ({
  ctx,
  textParams,
  battleInputMenuSpecs,
  menuOutlineColor,
}: DrawBattleInputMenuFromSpecsParams) => {
  textParams = textParams ?? DEFAULT_TEXT_PARAMS;
  menuOutlineColor = menuOutlineColor ?? COLOR_BLACK;

  const { outlineColor, fillColor, size } = textParams;
  const { x, y, w, h, textSpecs } = battleInputMenuSpecs;

  drawRect({
    x,
    y,
    w,
    h,
    outlineColor,
    ctx,
  });

  textSpecs.forEach((textSpec) => {
    const { x, y, text } = textSpec;
    drawText({
      text,
      x,
      y,
      ctx,
      textParams: {
        outlineColor,
        fillColor,
        size: size,
      },
    });
  });
};
