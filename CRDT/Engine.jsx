class CRDT {

  constructor() {
    this.state = new Map();
  }

  set(key, value) {
    this.state.set(key, {
      value,
      ts: Date.now()
    });
  }

  get(key) {
    return this.state.get(key);
  }
}

module.exports = CRDT;
