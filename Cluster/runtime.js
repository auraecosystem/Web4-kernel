const JSON5 = require("json5");
const fs = require("fs");

class ClusterNode {

  constructor() {
    this.config = JSON5.parse(
      fs.readFileSync("./config/cluster.json5", "utf8")
    );
  }

  boot() {
    console.log("[NODE] Booting Web4 node");

    this.startVM();
    this.startState();
    this.startNetwork();
    this.startHeartbeat();
  }

  startVM() {
    const VM = require("../vm/vm");
    this.vm = new VM(this);
    this.vm.start();
  }

  startState() {
    const CRDT = require("../state/crdt");
    this.state = new CRDT();
  }

  startNetwork() {
    const Mesh = require("../network/mesh");
    this.network = new Mesh();
  }

  startHeartbeat() {
    setInterval(() => {
      console.log("[NODE] heartbeat OK");
    }, 2000);
  }
}

new ClusterNode().boot();
