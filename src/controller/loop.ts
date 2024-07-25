// https://gafferongames.com/post/fix_your_timestep/
// https://iamschulz.com/writing-a-game-in-typescript/
// https://github.com/benjamin-t-brown/tavernity/blob/main/src/index.ts#L64

import { Game } from '../model/game';
import { clearCanvas } from '../view/canvas';

const MS_PER_FRAME_FOR_60_FPS = 16;
const DT = 0.01;

export const gameLoop = (game: Game) => {
  const currentTime = performance.now();
  let prevTime = currentTime;
  const msPerUpdate = 22;

  performanceLoop(prevTime);
  renderLoop(game);

  requestAnimationFrame(() => {
    gameLoop(game);
  });
};

const performanceLoop = (prevTime: number) => {
  const now = performance.now();
  let frameTime = now - prevTime;
  prevTime = now;

  if (frameTime > 4) {
    frameTime = 4;
  }
  const deltaTime = frameTime;
  frameTime -= deltaTime;
  // const fm = (deltaTime * targetMult) / EXPECTED_FS;
  // setFm(fm);
  // game.update(fm);
};

const renderLoop = (game: Game) => {
  game.clearCanvas();
  game.draw();
};
