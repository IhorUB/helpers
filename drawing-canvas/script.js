(function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const inputColor = document.getElementById('canvas-color');
  const canvasSize = document.getElementById('canvas-size');
  const increment = document.getElementById('canvas-increase');
  const decrement = document.getElementById('canvas-decrease');
  const clear = document.getElementById('canvas-clear');

  let size = +canvasSize.innerText;
  let color = 'black';
  let isPressed = false;
  let x;
  let y;

  canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
  });

  canvas.addEventListener('mouseup', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isPressed) return;
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  });

  inputColor.addEventListener('change', (e) => {
    color = e.target.value;
  });

  increment.addEventListener('click', () => {
    size++;
    decrement.disabled = false;
    canvasSize.innerText = size;
  });

  decrement.addEventListener('click', () => {
    size--;
    if (size <= 1) decrement.disabled = true;

    canvasSize.innerText = size;
  });

  clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });


  function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
  }

})();
