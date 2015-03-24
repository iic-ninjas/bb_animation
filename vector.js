function V2(x, y) {
  return new vector2(x, y);
}

function vector2(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

vector2.prototype.add = function(other) {
  return V2(this.x + other.x, this.y + other.y);
};

vector2.prototype.sub = function(other) {
  return V2(this.x - other.x, this.y - other.y);
};

vector2.prototype.scale = function(scalar) {
  return V2(this.x * scalar, this.y * scalar);
};

vector2.prototype.lengthSq = function() {
  return this.x*this.x + this.y*this.y;
};

vector2.prototype.length = function() {
  return Math.sqrt(this.lengthSq());
};

vector2.prototype.norm = function() {
  return this.scale(1/this.length());
};
