const countries = require("country-data/data/countries.json"),
  _ = require("lodash");

const summary = {
  success: 0,
  failure: 0,
  failures: {}
};

function normalizeCountry(input) {
  let toReturn;

  let success = value => {
    toReturn = value;
    summary.success += 1;
  };

  let failure = value => {
    summary.failure += 1;
    toReturn = false;

    if (summary.failures[value]) {
      summary.failures[value]++;
    } else {
      summary.failures[value] = 1;
    }
  };

  // name match
  let matchedCountry = _.find(countries, _.matchesProperty("name", input));
  if (matchedCountry) {
    success(matchedCountry.alpha3);
    return toReturn;
  }

  // match code alpha3
  matchedCountry = _.find(countries, _.matchesProperty("alpha3", input));
  if (matchedCountry) {
    success(matchedCountry.alpha3);
    return toReturn;
  }

  // match code alpha2
  matchedCountry = _.find(countries, _.matchesProperty("alpha2", input));
  if (matchedCountry) {
    success(matchedCountry.alpha3);
    return toReturn;
  }

  // manual mapping
  switch (input) {
    case "SPain":
    case "spain":
      success("ESP");
      break;
    case "México":
      success("MEX");
      break;
    case "germany":
    case 'Germany ':
      success("DEU");
      break;
    case "canada":
    case "Canada ":
      success("CAN");
      break;
    case "Czechia":
    case "Czech republic":
      success("CZE");
      break;
    case "Australia":
    case "Australia ":
    case "australia ":
    case "australia":
      success("AUS");
      break;
    case "france":
    case "France ":
      success("FRA");
      break;
    case "Russia":
    case "Russia ":
    case "russia":
    case "russia ":
      success("RUS");
      break;
    case "india":
    case "India ":
    case "india ":
      success("IND");
      break;
    case 'Iran':
      success("IRN");
      break;
    case 'italy':
      success("ITA");
      break;
    case "United States of America":
    case "Usa":
    case "usa":
    case "Us":
    case "us":
    case "United States ":
    case "united states":
    case "United states":
    case "USA ":
    case  'U.S.A.':
      success("USA");
      break;
    case "Venezuela":
      success("VEN");
      break;
    case "Brasil":
    case "brazil":
      success("BRA");
      break;
    case "Bolivia":
      success("BOL");
      break;
    case "United Kingdom":
    case "united kingdom":
    case "United kingdom":
    case "United Kingdom ":
    case "England":
    case "Scotland":
    case "Uk":
    case "uk":
      success("GBR");
      break;
    case "South Korea":
    case "Korea":
    case "Republic of Korea":
    case "Korea":
      success("KOR");
      break;
    case "The Netherlands":
    case "Netherlands ":
    case "netherlands":
    case "the Netherlands":
      success("NLD");
      break;
    case "sweden":
    case "Sweden ":
      success("SWE");
      break;
    case "Vietnam":
      success("VNM");
      break;
    case "indonesia":
      success("IDN");
      break;
    case "Ukraine ":
      success("UKR");
      break;
    case "belgium":
      success("BEL");
      break;
    case "Switzerland ":
      success("CHE");
      break;
    case "Denmark ":
      success("DNK");
      break;
    case "israel":
      success("ISR");
      break;
    case "Perú":
      success("PER");
      break;
    case 'Bosnia and Herzegovina':
      success("BIH");
      break;
    case 'Macedonia':
      success("MKD");
      break;
    case 'poland':
      success("POL");
      break;
    default:
      failure(input);
  }

  return toReturn;
}

module.exports = { normalizeCountry, summary };
