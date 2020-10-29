var debounce = require('lodash.debounce');
import API from './fetchCountries.js';
import listOfContriesTpl from '../templates/list-of-countries.hbs';
import countryCardTpl from '../templates/country-markup.hbs';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const inputEl = document.querySelector('.input-search');
const cardContainer = document.querySelector('.js-card-container');
let countryToSearch = '';

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
    .then(checkingNumberOfCountries)
    .catch(onFetchError);
}

function checkingNumberOfCountries(countries) {
  if (countries.length > 10) {
    error({
      title: 'Too many matches found.',
      text: 'Please enter a more specific query!',
      delay: 2000,
      closerHover: true,
    });
  } else if (countries.length <= 10 && countries.length > 1) {
    renderMarkup(listOfContriesTpl, countries);
  } else {
    renderMarkup(countryCardTpl, countries[0]);
  }
}

function renderMarkup(template, countries) {
  const markup = template(countries);
  cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  cardContainer.innerHTML = '';
  console.log(error);
}
