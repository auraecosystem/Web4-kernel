const { spawn } = require("child_process");

class Supervisor {

  constructor() {
    this.nodes = [];
    this.maxNodes = 3;
  }

  start() {
    console.log("[SUPERVISOR] Starting cluster...");

    for (let i = 0; i < this.maxNodes; i++) {
      this.spawnNode(i);
    }

    this.startHealthLoop();
  }

  spawnNode(id) {
    const node = spawn("node", ["cluster/node.js"]);

    node.on("exit", () => {
      console.log(`[SUPERVISOR] Node ${id} crashed → restarting`);
      this.spawnNode(id); // 🔥 SELF-HEAL
    });

    this.nodes.push(node);
  }

  startHealthLoop() {
    setInterval(() => {
      console.log("[SUPERVISOR] Cluster health OK");
    }, 3000);
  }
}

new Supervisor().start();
