(function() {
  const openBtn = document.querySelector('.nav-btn_open');
  const closeBtn = document.querySelector('.nav-close-btn');
  const nav = document.querySelectorAll('.aside-nav ');

  openBtn.addEventListener('click', () => {
    nav.forEach(navEl => navEl.classList.add('aside-nav_visible'));
  });

  closeBtn.addEventListener('click', () => {
    nav.forEach(navEl => navEl.classList.remove('aside-nav_visible'));
  })
})();