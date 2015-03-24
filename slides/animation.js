window.allSlides = window.allSlides || {};

(function() {
  function animationSlide() {

  }

  animationSlide.prototype.init = function(container) {
    this.container = container;
    this.canvas = this.container.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = 12;
    this.startRadius = 250;
    this.width = this.canvas.getAttribute("width");
    this.height = this.canvas.getAttribute("height");
    var gradient = this.ctx.createRadialGradient(Math.floor(this.width/2), this.height, this.startRadius, Math.floor(this.width/2), this.height, this.startRadius + 8*this.ctx.lineWidth);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1/7, "orange");
    gradient.addColorStop(2/7, "yellow");
    gradient.addColorStop(3/7, "green");
    gradient.addColorStop(4/7, "blue");
    gradient.addColorStop(5/7, "indigo");
    gradient.addColorStop(6/7, "violet");
    this.ctx.strokeStyle = gradient;
    this.animator = new Animator(this.animate.bind(this));
    this.animator.setDuration(2000);
    this.colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet"
    ];
  };

  animationSlide.prototype.show = function() {
    this.animator.setVal(0);
    this.animator.playForward();
  };

  animationSlide.prototype.hide = function() {
  };

  animationSlide.prototype.animate = function(t) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    var offset = 0;
    for (var i = 0; i < 7; ++i) {
      offset = -Math.sin(i/7.0) / 4;
      var pos = Math.max(0, t + (offset * (1-t)));
      //this.ctx.strokeStyle = this.colors[i];
      this.ctx.beginPath();
      this.ctx.arc(this.width/2, this.height, this.startRadius + (i+1) * this.ctx.lineWidth, Math.PI, Math.PI + (pos*Math.PI), false);
      this.ctx.stroke();
    }
  };

  var instance = new animationSlide();

  window.allSlides["slide_animation"] = instance;
})();
