window.allSlides = window.allSlides || {};

(function() {

  function IntegrationExample() {
  }

  IntegrationExample.prototype.init = function(container) {
    this.container = container;
    this.box = container.querySelector(".box");
    this.x = 0;
    this.direction = 1;
    this.velocity = 0;

    this.integrator = new Integrator(this.animate.bind(this));
    this.boundFlip = this.flip.bind(this);
  };

  IntegrationExample.prototype.show = function() {
    document.addEventListener("click", this.boundFlip);
    this.integrator.start();
  };

  IntegrationExample.prototype.hide = function() {
    document.removeEventListener("click", this.boundFlip);
    this.integrator.stop();
  };

  IntegrationExample.prototype.flip = function() {
    this.direction *= -1;
  };

  IntegrationExample.prototype.animate = function(dt) {
    this.velocity += 500*dt*this.direction;

    this.x += this.velocity * dt;

    if (this.x > 100 || this.x < 0) {
      this.x = Math.max(0, Math.min(this.x, 100));
      this.velocity = -this.velocity * 0.4;
    }

    this.box.style.left = this.x + "%";
  };

  var example = new IntegrationExample();

  window.allSlides["slide_integration_example"] = example;

})();


