(function () {
  const textEl = document.getElementById('text');

  function onMove(e) {
    textEl.innerText = `e.clientX: ${e.clientX}; e.clientY: ${e.clientY}`;
  }

  onMove = throttle(onMove, 2000);

  function throttle(fn, ms) {
    let isThrottled = false;
    let savedArgs, $this;

    function cb() {
      if (isThrottled) {
        savedArgs = arguments;
        $this = this;
        return;
      }

      fn.apply(this, arguments);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
        if (savedArgs) {
          cb.apply($this, savedArgs);
          savedArgs = $this = null;
        }
      }, ms)
    }

    return cb;
  }

  document.querySelector('body').addEventListener('mousemove', onMove);

})();