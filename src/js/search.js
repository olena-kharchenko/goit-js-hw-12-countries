var debounce = require('lodash.debounce');
import API from './fetchCountries.js';

const inputEl = document.querySelector('.input-search');
const cardContainer = document.querySelector('.js-card-container');
let countryToSearch = 'ukr';

inputEl.addEventListener(
  'input',
  debounce(() => {
    onSearch();
  }, 500),
);

function onSearch() {
  countryToSearch = inputEl.value;
  console.log(countryToSearch);

  API.fetchCountries(countryToSearch)
    .then(renderCountryCard)
    .catch(onFetchError);
}

function renderCountryCard(country) {
  console.log(country);
  //   const markup = countryCardTpl(country);
  //   cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  console.log(error);
}
