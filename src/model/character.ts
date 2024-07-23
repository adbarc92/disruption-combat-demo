import { CharacterStatBlock } from './stats';

class Character {
  // FIXME: Equipment
  statBlock: CharacterStatBlock;
  constructor(statBlock: CharacterStatBlock) {
    this.statBlock = statBlock;
  }
}
