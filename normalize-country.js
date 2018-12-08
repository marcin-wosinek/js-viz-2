const countries = require('country-data/data/countries.json'),
  _ = require('lodash');

const summary = {
  success: 0,
  failure: 0
};

function normalizeCountry (input) {
  let toReturn;

  let success = (returnValue) => {
    toReturn = returnValue;
    summary.success += 1;
  }

  // name match
  let matchedCountry = _.find(countries, _.matchesProperty('name', input));
  if(matchedCountry) {
    success(matchedCountry.alpha3);
    return toReturn;
  }

  // match code alpha3
  matchedCountry = _.find(countries, _.matchesProperty('alpha3', input));
  if(matchedCountry) {
    success(matchedCountry.alpha3);
    return toReturn;
  }

  // match code alpha2
  matchedCountry = _.find(countries, _.matchesProperty('alpha2', input));
  if(matchedCountry) {
    success(matchedCountry.alpha3);
    return toReturn;
  }

  // manual mapping
  switch(input) {
    case 'SPain':
      success('ESP')
      break;
    case 'Russia':
      success('RUS')
      break;
    case 'United States of America':
    case 'Usa':
      success('USA')
      break;
    case 'Brasil':
    case 'brazil':
      success('BRA')
      break;
    case 'Bolivia':
      success('BOL')
      break;
    case 'United Kingdom':
    case 'England':
    case 'Scotland':
      success('GBR')
      break;
    case 'South Korea':
    case 'Korea':
    case 'Republic of Korea':
    case 'Korea':
      success('KOR');
      break;
    default:
      console.log(input);
      summary.failure += 1;
  }

  return input;
};

module.exports = {normalizeCountry, summary};
