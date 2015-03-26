function Page(restX, restY, restWidth, restHeight, bigX, bigY, bigWidth, bigHeight, onOpen, color) {
  this.container = document.createElement("DIV");
  this.container.classList.add("page");
  this.container.style["background-color"] = color;

  this.restX = restX;
  this.restY = restY;
  this.restWidth = restWidth;
  this.restHeight = restHeight;

  this.bigX = bigX;
  this.bigY = bigY;
  this.bigWidth = bigWidth;
  this.bigHeight = bigHeight;

  this.animator = new Animator(this.animate.bind(this));
  this.animator.playDirection = -1;
  this.animator.setDuration(1000);
  this.animator.setVal(0);

  this.boundClick = this.click.bind(this);
  this.container.addEventListener("click", this.boundClick);

  this.onOpen = onOpen;
}

Page.prototype.getContainer = function() { return this.container; };

Page.prototype.click = function() { this.toggle(); };

Page.prototype.toggle = function() {
  if (this.animator.playDirection == 1) {
    this.animator.playBackwards();
  } else {
    this.animator.playForward();
    this.onOpen(this);
  }
};

Page.prototype.close = function() {
  this.animator.playBackwards();
}

Page.prototype.animate = function(t) {
  var slideT = Animator.partitionAnimation(t, 0, 0.3);
  this.container.style.left = Animator.lerp(this.easeOut(slideT), this.restX, this.bigX) + "px";

  growT = this.easeIn(t);
  this.container.style.top = Animator.lerp(growT, this.restY, this.bigY) + "px";
  this.container.style.width = Animator.lerp(growT, this.restWidth, this.bigWidth) + "px";
  this.container.style.height = Animator.lerp(growT, this.restHeight, this.bigHeight) + "px";

  this.container.style["z-index"] = Math.floor(t * 100);
};

Page.prototype.easeIn = function(t) {
  return t*t*t*t*t;
};

Page.prototype.easeOut = function(t) {
  t = 1-t;
  return 1-t*t*t*t*t;
};

Page.prototype.a = function (t, s) {
  return t * t * ((s + 1) * t - s);
}

Page.prototype.o = function (t, s) {
  return t * t * ((s + 1) * t + s);
}

Page.prototype.anticipateOvershoot = function (t) {
  var tension = 2.0;
  if (t < 0.5) return 0.5 * this.a(t * tension, 3);
  else return 0.5 * (this.o(t * tension - tension, 3) + tension);
}
