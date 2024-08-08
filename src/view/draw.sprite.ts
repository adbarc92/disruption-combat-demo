import { CanvasContext } from '../model/types';

const DEFAULT_SCALE = 1;

export const SPRITES: SpriteDictionary = {};

interface Sprite {
  image: HTMLCanvasElement;
  x: number;
  y: number;
  w: number;
  h: number;
}

type SpriteDictionary = { [key: string]: Sprite };

interface DrawSpriteParams {
  sprite: Sprite;
  ctx: CanvasContext;
  scale?: number;
  x: number;
  y: number;
}

export const drawSprite = ({ sprite, ctx, scale, x, y }: DrawSpriteParams) => {
  scale = scale ?? DEFAULT_SCALE;
  const { image, x: sprX, y: sprY, w: sprW, h: sprH } = sprite;
  // This call is only necessary if drawing part of a canvas?
  ctx.drawImage(
    image,
    sprX,
    sprY,
    sprW,
    sprH,
    x,
    y,
    sprW * scale,
    sprH * scale,
  );
};
