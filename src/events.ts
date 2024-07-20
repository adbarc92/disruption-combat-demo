import { Game } from './game';

const addLoadListener = (game: Game) => {
  window.addEventListener('load', () => {
    game.start();
  });
};
