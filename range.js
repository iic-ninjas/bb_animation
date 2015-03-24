function Range() {
  this.pips = [];

  this.container = document.createElement("DIV");
  this.container.classList.add("range_container");

  this.range = document.createElement("DIV");
  this.range.classList.add("range");
}

Range.prototype.getContainer = function() {
  return this.container;
};

Range.prototype.createPip = function() {
  var pip = new Pip();
  this.container.appendChild(pip.getContainer());
  this.pips.push(pip);

  return pip;
};

Range.prototype.getPip = function(idx) {
  return this.pips[idx];
};

Range.prototype.numPips = function() {
  return this.pips.length;
};

function Pip() {
  this.container = document.createElement("DIV");
  this.container.classList.add("pip");

  this.topValue = document.createElement("DIV");
  this.topValue.classList.add("top_value");

  this.bottomValue = document.createElement("DIV");
  this.bottomValue.classList.add("bottom_value");

  this.container.appendChild(this.topValue);
  this.container.appendChild(this.bottomValue);
}

Pip.prototype.getContainer = function() {
  return this.container;
};

Pip.prototype.setValue = function(topVal, bottomVal, pos) {
  if (topVal !== undefined) {
    this.topValue.textContent = topVal;
  }

  if (bottomVal !== undefined) {
    this.bottomValue.textContent = bottomVal;
  }

  if (pos !== undefined) {
    this.container.style.left = (pos * 100) + "%";
  }
};
