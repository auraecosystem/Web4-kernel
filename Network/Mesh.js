class Mesh {

  constructor() {
    this.peers = [];
    this.discover();
  }

  discover() {
    console.log("[MESH] discovering peers...");
  }

  broadcast(msg) {
    console.log("[MESH] broadcast:", msg);
  }
}

module.exports = Mesh;
