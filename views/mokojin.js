function Mokojin() {
  this.container = document.createElement("DIV");
  this.icon = document.createElement("DIV");
  this.name = document.createElement("DIV");
  this.background = document.createElement("DIV");
  this.shine = document.createElement("DIV");
  this.text = document.createElement("SPAN");

  this.container.classList.add("mokojin");
  this.icon.classList.add("icon");
  this.name.classList.add("name");
  this.background.classList.add("background");
  this.shine.classList.add("shine");
  this.text.classList.add("text");

  this.text.textContent = "Name";

  this.container.appendChild(this.icon);
  this.container.appendChild(this.name);
  this.name.appendChild(this.background);
  this.name.appendChild(this.shine);
  this.name.appendChild(this.text);

  this.animator = new Animator(this.animate.bind(this));
  this.animator.setDuration(500);
  this.animator.playDirection = -1;

  this.boundClick = this.click.bind(this);
  this.container.addEventListener("click", this.boundClick);
}

Mokojin.prototype.getContainer = function() { return this.container; };

Mokojin.prototype.toggle = function() {
  if (this.animator.playDirection == 1) {
    this.animator.playBackwards();
  } else {
    this.animator.playForward();
  }
};

Mokojin.prototype.animate = function(t) {
  this.icon.style["border-width"] = Animator.lerp(this.overshoot(t), 0, 5) + "px";
  this.background.style.width = Animator.lerp(this.easeOut(t), 0, 180) + "px";
  this.shine.style.left = Animator.lerp(Animator.partitionAnimation(t, 0.6, 1.0), -40, 170) + "px";
};

Mokojin.prototype.click = function() {
  this.toggle();
};

Mokojin.prototype.easeOut = function(t) {
  return 1-Math.pow(1-t, 7);
};

Mokojin.prototype.overshoot = function(t) {
  var mTension = 5.0;
  t -= 1.0;
  return t * t * ((mTension + 1) * t + mTension) + 1.0;
};
