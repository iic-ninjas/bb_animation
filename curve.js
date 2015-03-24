function drawCurve(canvasCtx, width, height, fn, min, max) {
  canvasCtx.fillStyle = "black";
  canvasCtx.fillRect(0, 0, width, height);
  canvasCtx.strokeStyle = "white";
  canvasCtx.lineWidth = 2;
  canvasCtx.beginPath();
  canvasCtx.moveTo(0, height);
  for (var i = 0; i < width; ++i) {
    var pos = Animator.map(i, 0, width, min, max);
    var x = i;
    var y = height - Animator.map(fn(pos), min, max, 0, height);
    canvasCtx.lineTo(x, y);
  }
  canvasCtx.stroke();
}
