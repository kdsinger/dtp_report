/*
Used to throttle the number of concurrent rest request spawned but the DTP Reporter.
Max allowed number of active rest requests is identified in the index.js
 */
// "use strict";

class TaskQueue {
  constructor (concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  pushTask (task) {
    this.queue.push(task);
    this.next();
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      task (() => {
        this.running--;
        this.next();
      });
      this.running++;
    }
  }
};
