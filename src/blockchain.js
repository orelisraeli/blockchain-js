import Block from './block.js';

export default class Blockchain {
  constructor(difficulty = 1) {
    this.chain = [new Block()];
    this.difficulty =
      typeof difficulty === 'string' ? parseInt(difficulty, 10) : difficulty;

    console.log(`mining difficulty: ${difficulty}`);

    this.getLast().mine(this.difficulty);

    console.log('chain created successfully');
  }

  getLast() {
    return this.chain[this.chain.length - 1];
  }

  add(block) {
    block.prevHash = this.getLast().hash;
    block.hash = block.getHash();
    block.mine(this.difficulty);
    this.chain.push(block);
  }

  validate() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (
        currentBlock.hash !== currentBlock.getHash() ||
        prevBlock.hash !== currentBlock.prevHash
      ) {
        return false;
      }
    }

    return true;
  }
}
