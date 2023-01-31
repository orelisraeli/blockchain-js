import crypto from 'crypto';

export default class Block {
  constructor(data = {}) {
    this.timestamp = Date.now().toString();
    this.data = data;
    this.prev = '';
    this.hash = this.getHash();
    this.nonce = 0;
  }

  getHash() {
    const hashText =
      this.prev + this.timestamp + JSON.stringify(this.data) + this.nonce;

    const buffer = new TextEncoder().encode(hashText);

    return crypto.createHash('sha256').update(buffer).digest('hex');
  }

  mine(difficulty) {
    while (this.hash.substring(0, difficulty) !== '0'.repeat(difficulty)) {
      this.nonce++;
      this.hash = this.getHash();
    }
  }
}
