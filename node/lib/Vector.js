/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

var Vector = function(x, y) {
  this.x = x;
  this.y = y;

  this.getX = function() {
    return this.x;
  };

  this.vectorByDots = function(dot1, dot2)
  {
    this.x = dot2.x - dot1.x;
    this.y = dot2.y - dot1.y;
  };

  this.getY = function() {
    return this.y;
  };

  this.halfVector = function(vec) {
    return new Vector(
      this.getX() + (vec.getX() - this.getX()) / 2,
      this.getY() + (vec.getY() - this.getY()) / 2
    );
  };

  this.equals = function(vec) {
    return vec.getX() === this.getX() && vec.getY() === this.getY();
  };

  this.addVector = function(vec) {
    return new Vector(this.getX() + vec.getX(), this.getY() + vec.getY());
  };

  this.subtractVector = function(vec) {
    return new Vector(this.getX() - vec.getX(), this.getY() - vec.getY());
  };

  this.multiply = function(scalar) {
    return new Vector(
      this.getX() * scalar,
      this.getY() * scalar
    );
  };

  this.multiplyVector = function(vec) {
    return new Vector(
      this.getX() * vec.getX(),
      this.getY() * vec.getY()
    );
  };

  this.divide = function(scalar) {
    return new Vector(
      this.getX() / scalar,
      this.getY() / scalar
    );
  };

  this.invert = function(scalar) {
    return new Vector(
      -this.getX(),
      -this.getY()
    );
  };

  this.dotProduct = function(vec) {
    return this.getX() * vec.getX() + this.getY() * vec.getY();
  };

  this.crossProduct = function(vec) {
    return this.getX() * vec.getY() - this.getY() * vec.getX();
  };

  this.reflect = function(vec) {
    var newVec     = vec.multiply(2);
    var dotProduct = this.dotProduct(vec);
    newVec = newVec.multiply(dotProduct);
    return this.subtractVector(newVec);
  };

  this.reflectX = function() {
    return new Vector(-this.getX(), this.getY());
  };

  this.reflectY = function() {
    return new Vector(this.getX(), -this.getY());
  };

  this.scale = function(factor) {
    return new Vector(
      this.getX() * factor,
      this.getY() * factor
    );
  };

  this.scaleX = function(factor) {
    return new Vector(
      this.getX() * factor,
      this.getY()
    );
  };

  this.scaleY = function(factor) {
    return new Vector(
      this.getX(),
      this.getY() * factor
    );
  };

  this.getLength = function() {
    return Math.sqrt(Math.pow(this.getX(), 2.0) + Math.pow(this.getY(), 2.0));
  };

  this.normalise = function() {
    var fLength = this.getLength();
    if (fLength > 1e-08)
      return new Vector(this.getX() / fLength, this.getY() / fLength);
    return this.clone(); // Might cause issues in IE.
  };

  this.clone = function() {
    return new Vector(this.getX(), this.getY());
  };

  this.contraVector = function() {
    return this.invert();
  };

  this.lessThan = function(vector) {
    return (this.getX() > vector.getX() && this.getY() > vector.getY());
  };

  this.clear = function() {
    this.x = 0.0;
    this.y = 0.0;
  };
};

module.exports = Vector
