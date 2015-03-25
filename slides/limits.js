window.allSlides = window.allSlides || {};

(function() {

  function bounce(t) {
    return t*t*8.0;
  }

  function ease(t) {
    t *= 1.1226;
    if (t < 0.3535) {
      return bounce(t);
    } else if (t < 0.7408) {
      return bounce(t - 0.54719) + 0.7;
    } else if (t < 0.9644) {
      return bounce(t - 0.8526) + 0.9;
    } else {
      return bounce(t - 1.0435) + 0.95;
    }
  }

  function Limits() {
  }

  Limits.prototype.init = function(container) {
    this.container = container;
    this.simBox = container.querySelector(".sim");
    this.tweenBox = container.querySelector(".tween");
    this.gravityTop = container.querySelector(".gravity.top");
    this.gravityBottom = container.querySelector(".gravity.bottom");
    this.x = 0;
    this.direction = 1;
    this.velocity = 0;

    this.integrator = new Integrator(this.sim.bind(this));
    this.boundFlip = this.flip.bind(this);

    this.animator = new Animator(this.tween.bind(this));
    this.animator.setDuration(2000);
  };

  Limits.prototype.show = function() {
    document.addEventListener("click", this.boundFlip);
    this.animator.setVal(0);
    this.direction = 1;
    this.x = 0;
    this.velocity = 0;
    this.flip();
  };

  Limits.prototype.hide = function() {
    document.removeEventListener("click", this.boundFlip);
    this.integrator.stop();
  };

  Limits.prototype.flip = function() {
    this.direction *= -1;
    this.integrator.start();
    if (this.direction == 1) {
      this.gravityTop.classList.remove("on");
      this.gravityBottom.classList.add("on");
      this.animator.playForward();
    } else {
      this.gravityTop.classList.add("on");
      this.gravityBottom.classList.remove("on");
      this.animator.playBackwards();
    }
  };

  Limits.prototype.sim = function(dt) {
    this.velocity += 450*dt*this.direction;

    this.x += this.velocity * dt;

    if (this.x > 100 || this.x < 0) {
      this.x = Math.max(0, Math.min(this.x, 100));
      this.velocity = -this.velocity * 0.54;
    }

    this.simBox.style.top = this.x + "%";
  };

  Limits.prototype.tween = function(t) {
    t = ease(t);
    this.tweenBox.style.top = Animator.lerp(t, 0, 100) + "%";
  };

  var limits = new Limits();

  window.allSlides["slide_limits"] = limits;

})();



