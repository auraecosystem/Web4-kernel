const JSON5 = require("json5");
const fs = require("fs");
const EventEmitter = require("events");
const crypto = require("crypto");

class ClusterNode extends EventEmitter {

  constructor() {
    super();
    this.id = crypto.randomUUID();
    this.peers = new Map();
    this.state = {};
    this.config = this.loadConfig();
  }

  loadConfig() {
    return JSON5.parse(
      fs.readFileSync("./config/cluster.json5", "utf8")
    );
  }

  boot() {
    console.log(`[NODE ${this.id}] Booting cluster node`);

    this.startNetworkAgent();
    this.startStateEngine();
    this.startVM();
    this.startScheduler();

    console.log(`[NODE ${this.id}] ONLINE`);
  }

  startNetworkAgent() {
    console.log("[NET] Peer discovery active");

    // simulate discovery
    this.peers.set("node-1", { status: "active" });
  }

  startStateEngine() {
    console.log("[STATE] CRDT distributed memory active");
  }

  startScheduler() {
    console.log("[SCHED] Local task scheduler running");
  }

  startVM() {
    const VM = require("../vm/vm.js");
    this.vm = new VM(this);
    this.vm.start();
  }

  syncState(key, value) {
    this.state[key] = value;
    this.broadcastState(key, value);
  }

  broadcastState(key, value) {
    console.log("[SYNC] broadcasting:", key, value);
  }
}

const node = new ClusterNode();
node.boot();
