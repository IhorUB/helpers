(function () {
  const progress = document.getElementById('progress');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const circles = document.querySelectorAll('.progress-circle');

  let currentActiveCircle = 1;

  next.addEventListener('click', () => {
    currentActiveCircle++;
    if (currentActiveCircle > circles.length) currentActiveCircle = circles.length;
    update();
  });

  prev.addEventListener('click', () => {
    currentActiveCircle--;
    if (currentActiveCircle < 1) currentActiveCircle = 1;
    update();
  });

  function update() {
    circles.forEach((circle, index) => {
      index < currentActiveCircle ? circle.classList.add('active')
        : circle.classList.remove('active');

    });

    const activeCircles = document.getElementsByClassName('progress-circle active');
    progress.style.width = ((activeCircles.length - 1) / (circles.length - 1) * 100 + '%');

    if (activeCircles.length === 1) {
      prev.disabled = true;
      return;
    }

    if (activeCircles.length === circles.length) {
      next.disabled = true;
      return;
    }

    prev.disabled = false;
    next.disabled = false;
  }
})();

