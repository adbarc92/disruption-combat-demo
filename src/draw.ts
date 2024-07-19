/**
 * Canvas: a means for drawing graphics
 * Context: the thing onto which the drawing will be rendered
 * The actual drawing is done via the context's methods.
 */

import { getGlobalCtx } from "./canvas";
import { Color } from "./color";
import { CanvasContext } from "./types";

export const drawRect = (
  x: number,
  y: number,
  w: number,
  h: number,
  fill: boolean = false,
  color: Color,
  ctx?: CanvasContext
) => {
  ctx = ctx ?? getGlobalCtx();
  ctx[fill ? "fillStyle" : "strokeStyle"] = color.name;
  ctx[fill ? "fillRect" : "strokeRect"](x, y, w, h);
};

export const drawCircle = (
  x: number,
  y: number,
  r: number,
  fill: boolean = false,
  color: Color,
  ctx?: CanvasContext
) => {
  ctx = ctx ?? getGlobalCtx();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx[fill ? "fillStyle" : "strokeStyle"] = color.name;
  ctx[fill ? "fill" : "stroke"]();
};
