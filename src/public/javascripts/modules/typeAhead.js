import axios from 'axios';
import dompurify from 'dompurify';

const KEYCODES = {
  up: 38,
  down: 40,
  enter: 13
};

function searchResultsHTML(stores) {
  return stores.map(store => {
    return `
      <a href="/store/${store.slug}" class="search__result">
        <strong>${store.name}</strong>
      </a>
    `;
  }).join('');
}

function typeAhead(search) {
  if (!search) {
    return;
  }

  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  searchInput.on('input', function () {
    if (!this.value) {
      searchResults.style.display = 'none';
      return;
    }

    searchResults.style.display = 'block';

    axios
      .get(`/api/search?q=${this.value}`)
      .then(res => {
        if (!res.data.length) {
          searchResults.innerHTML = dompurify.sanitize(`<div class="search__result">No results for ${this.value} found!</div>`);
          return;
        }

        searchResults.innerHTML = dompurify.sanitize(searchResultsHTML(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  });

  searchInput.on('keyup', (evt) => {
    if (![KEYCODES.up, KEYCODES.down, KEYCODES.enter].includes(evt.keyCode)) {
      return;
    }

    const activeClass = 'search__result--active';
    const current = search.querySelector(`.${activeClass}`);
    const items = search.querySelectorAll('.search__result');
    let next;

    if (evt.keyCode === KEYCODES.down && current) {
      next = current.nextElementSibling || items[0];
    } else if (evt.keyCode === KEYCODES.down) {
      next = items[0];
    } else if (evt.keyCode === KEYCODES.up && current) {
      next = current.previousElementSibling || items[items.length - 1];
    } else if (evt.keyCode === KEYCODES.up) {
      next = items[items.length - 1];
    } else if (evt.keyCode === KEYCODES.enter && current.href) {
      window.location = current.href;
      return;
    }

    if (current) {
      current.classList.remove(activeClass);
    }

    next.classList.add(activeClass);
  });
}

export default typeAhead;
