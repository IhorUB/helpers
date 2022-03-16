(function () {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    counter.innerText = '0';

    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
      const currentCounter = +counter.innerText;

      const incrementStep = target / 250;

      if (currentCounter < target) {
        counter.innerText = `${Math.ceil(currentCounter + incrementStep)}`;
        setTimeout(updateCounter, 1);
        return;
      }
      counter.innerText = target;
    }

    updateCounter();
  });
}())