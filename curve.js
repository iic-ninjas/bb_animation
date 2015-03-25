function drawCurve(canvasCtx, width, height, fn, min, max) {
  var minHeight = height * 0.1;
  var maxHeight = height * 0.9;
  canvasCtx.fillStyle = "black";
  canvasCtx.fillRect(0, 0, width, height);


  canvasCtx.lineWidth = 1;
  canvasCtx.strokeStyle = "red";
  canvasCtx.beginPath();
  canvasCtx.moveTo(0, height - minHeight);
  canvasCtx.lineTo(width, height - minHeight);
  canvasCtx.stroke();
  canvasCtx.strokeStyle = "lightgreen";
  canvasCtx.beginPath();
  canvasCtx.moveTo(0, height - maxHeight);
  canvasCtx.lineTo(width, height - maxHeight);
  canvasCtx.stroke();

  canvasCtx.strokeStyle = "white";
  canvasCtx.lineWidth = 2;
  canvasCtx.beginPath();
  canvasCtx.moveTo(0, height);
  for (var i = 0; i < width; ++i) {
    var pos = Animator.map(i, 0, width, min, max);
    var x = i;
    var y = height - Animator.map(fn(pos), min, max, minHeight, maxHeight);
    canvasCtx.lineTo(x, y);
  }
  canvasCtx.stroke();
}
