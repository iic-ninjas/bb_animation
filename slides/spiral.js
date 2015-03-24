window.allSlides = window.allSlides || {};

(function() {

  function Particle(pos, vel, color) {
    this.pos = pos || V2();
    this.vel = vel || V2();
    this.life = 3;
    this.color = color;
  }

  Particle.prototype.update = function(dt) {
    this.pos = this.pos.add(this.vel.scale(dt));
    this.life -= dt;
  };

  function Spiral() {
  }

  Spiral.prototype.init = function(container) {
    this.container = container;
    this.canvas = container.querySelector("canvas");
    this.width = 800;
    this.height = 800;
    this.ctx = this.canvas.getContext("2d");
    this.mousePos = V2(0, 0);

    this.particles = [];
    this.particleGenTimer = 0;
    this.rotation = 0;

    this.integrator = new Integrator(this.animate.bind(this));
    this.boundMouse = this.mouse.bind(this);
    this.colors = [
      "black",
      "darkred",
      "darkgreen",
      "brown",
      "darkblue",
      "indigo"
    ];
  };

  Spiral.prototype.show = function() {
    document.addEventListener("mousemove", this.boundMouse);
    this.integrator.start();
  };

  Spiral.prototype.hide = function() {
    document.removeEventListener("mousemove", this.boundMouse);
    this.integrator.stop();
  };

  Spiral.prototype.mouse = function(ev) {
    this.mousePos = V2(ev.offsetX, ev.offsetY);
  };

  Spiral.prototype.animate = function(dt) {
    var livingParticles = [];
    for (var i = 0; i < this.particles.length; ++i ) {
      var diff = this.particles[i].pos.sub(this.mousePos);
      var norm = diff.norm();
      this.particles[i].vel = this.particles[i].vel.add(norm.scale(1/diff.length() * 150));

      this.particles[i].update(dt);

      if (this.particles[i].life > 0) {
        livingParticles.push(this.particles[i]);
      }
    }

    this.particles = livingParticles;

    this.particleGenTimer += dt;
    this.rotation += Math.PI * dt;

    if (this.particleGenTimer > 0.02) {
      this.particleGenTimer -= 0.02;
      this.particles.push(this.makeParticle());
      this.particles.push(this.makeParticle());
      this.particles.push(this.makeParticle());
      this.particles.push(this.makeParticle());
      this.particles.push(this.makeParticle());
      this.particles.push(this.makeParticle());
    }

    this.render();
  };

  Spiral.prototype.render = function() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);
    for (var i = 0; i < this.particles.length; ++i) {
      this.ctx.fillStyle = this.particles[i].color;
      var pos = this.particles[i].pos;
      this.ctx.fillRect(pos.x, pos.y, 3, 3);
    }
  };

  Spiral.prototype.makeParticle = function() {
    var angle = Math.random()*Math.PI*2;
    return new Particle(V2(this.width/2, this.height/2),
                        V2(Math.cos(angle), Math.sin(angle)).scale(100),
                        this.colors[Math.round(Math.random()*(this.colors.length-1))]);
  };

  var spiral = new Spiral();

  window.allSlides["slide_q1"] = spiral;

})();



