function easeInPow(fn, power) {
  return function(t) {
    fn(Math.pow(t, power));
  };
}

function easeOutPow(fn, power) {
  return function(t) {
    t = 1-t;
    fn(1-Math.pow(t, power));
  };
}

function easeInSq(fn) {
  return easeInPow(fn, 2);
}

function easeOutSq(fn) {
  return easeOutPow(fn, 2);
}
