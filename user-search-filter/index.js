(function () {
  const apiLink = 'https://randomuser.me/api?results=50';
  const result = document.getElementById('search-result');
  const filter = document.getElementById('search-filter');
  let searchItems = [];

  getData();

  async function getData() {
    try {
      const res = await fetch(apiLink);
      const {results} = await res.json();

      result.innerHTML = '';
      results.forEach(user => {
        let userItem = document.createElement('li');
        userItem.classList.add('search-list__item');
        userItem.innerHTML = `
          <img class="user-ava" src="${user.picture.large}" alt="${user.name.first}">
          <div class="user-info">
            <h5 class="user-info__name">${user.name.first} ${user.name.last}</h5>
            <p class="user-info__location">${user.location.country}, ${user.location.city}</p>
          </div>`;
        searchItems.push(userItem);
        result.appendChild(userItem);
      });

    } catch (e) {
      console.error('Error', e);
    }
  }

  const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => {
        fn.apply(this, arguments)
      }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
    };
  }


  function filterUsers(value) {
    searchItems.forEach(item => {
      item.innerText.toLowerCase().includes(value.toLowerCase())
        ? item.classList.remove('hide')
        : item.classList.add('hide');
    })
  }

  filterUsers = debounce(filterUsers, 200);
  filter.addEventListener('input', (e) => filterUsers(e.target.value));
})();