import getRefs from '../js/refs';

const refs = getRefs();

function renderCountryList(countries, name) {
  const markup = countries.map(country => name(country)).join(' ');
  refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}
export default { renderCountryList };
