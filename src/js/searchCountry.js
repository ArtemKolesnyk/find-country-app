import renderCountry from './render';
import countryList from '../tamplates/countriesList.hbs';
import countryCard from '../tamplates/country.hbs';
import API from './fetchCountries';
import getRefs from './refs';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();
var debounce = require('lodash.debounce');
const { error } = require('@pnotify/core');

refs.inputSearch.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.value;
  if (searchQuery === '') {
    return;
  }
  hideCountryList();

  API.fetchCountries(searchQuery)
    .then(onSearchQuery)
    .catch(error => console.log(error));
}

function onSearchQuery(searchList) {
  if (searchList.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific request!',
      delay: 250,
    });
  } else if (searchList.status === 404) {
    error({
      text: 'Country not found. Please enter a more specific request!',
      delay: 250,
    });
  } else if (searchList.length === 1) {
    renderCountry.renderCountryList(searchList, countryCard);
  } else if (searchList.length <= 10) {
    renderCountry.renderCountryList(searchList, countryList);
  }
}

function hideCountryList() {
  refs.cardContainer.innerHTML = '';
}
