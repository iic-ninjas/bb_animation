function Integrator(animFn) {
  this.animFn = animFn;
  this.playing = false;
}

Integrator.prototype.start = function() {
  if (!this.playing) {
    this.lastTime = Date.now();
    this.playing = true;
    this.update();
  }
};

Integrator.prototype.stop = function() {
  if (this.playing) {
    this.playing = false;
  }
};

Integrator.prototype.update = function() {
  if (this.playing) {
    var currentTime = Date.now();
    var delta = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
    this.animFn(delta);

    requestAnimationFrame(this.update.bind(this));
  }
};
