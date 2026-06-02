module.exports = class VM {

  constructor(node) {
    this.node = node;
    this.status = "running";
  }

  start() {
    console.log("[VM] Sandbox started");
  }

  restart() {
    console.log("[VM] Restarting sandbox");
    this.status = "recovered";
  }

  execute(task) {
    console.log("[VM] executing:", task);
  }
};
