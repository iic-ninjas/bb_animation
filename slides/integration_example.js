window.allSlides = window.allSlides || {};

(function() {

  function IntegrationExample() {
  }

  IntegrationExample.prototype.init = function(container) {
    this.container = container;
    this.box = container.querySelector(".box");
    this.mouse = { x: 0, y: 0 };
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.offset = {
      x: parseInt(document.querySelector(".slides").offsetLeft),
      y: parseInt(document.querySelector(".slides").offsetTop)
    };

    this.boundUpdateMousePosition = this.updateMousePosition.bind(this);

    this.integrator = new Integrator(this.animate.bind(this));
  };

  IntegrationExample.prototype.show = function() {
    document.body.addEventListener("mousemove", this.boundUpdateMousePosition);
    this.integrator.start();
  };

  IntegrationExample.prototype.hide = function() {
    document.body.removeEventListener("mousemove", this.boundUpdateMousePosition);
    this.integrator.stop();
  };

  IntegrationExample.prototype.updateMousePosition = function(ev) {
    this.mouse.x = ev.pageX;
    this.mouse.y = ev.pageY;
  };

  IntegrationExample.prototype.animate = function(dt) {
    var target = this.mouse;
    var acceleration = 5000;

    var direction = {
      x: target.x - this.position.x,
      y: target.y - this.position.y
    };

    var distance = Math.sqrt(direction.x*direction.x + direction.y*direction.y);
    if (distance > 0) {
      direction.x /= distance;
      direction.y /= distance;
    }

    this.velocity.x += direction.x * acceleration * dt;
    this.velocity.y += direction.y * acceleration * dt;
    this.velocity.x *= 1-dt;
    this.velocity.y *= 1-dt;

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;

    this.box.style.left = this.position.x - this.offset.x + "px";
    this.box.style.top = this.position.y - this.offset.y + "px";
  };

  var example = new IntegrationExample();

  window.allSlides["slide_integration_example"] = example;

})();

