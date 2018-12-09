#!/usr/bin/env node

const _ = require('lodash'),
  fs = require('fs'),
  {normalizeCountry, summary} = require('./normalize-country'),
  data = require('./js-salary-country.json')
    .filter(entry => entry.salary && entry.country)
    .map(entry => {
      return {
        country: normalizeCountry(entry.country),
        salary: entry.salary,
      };
    }),
  mappedSalaries = data.map(entry => {
    let salary;

    switch (entry.salary) {
      case 'I work for free :(':
        salary = 0;
        break;
      case '$0-$10k':
        salary = 5000;
        break;
      case '$10k-$30k':
        salary = 20000;
        break;
      case '$30k-$50k':
        salary = 40000;
        break;
      case '$50k-$100k':
        salary = 75000;
        break;
      case '$100k-$200k':
        salary = 150000;
        break;
      case '$200k+':
        salary = 250000;
    }
    return {
      salary,
      country: entry.country
    };
  }),
  combined = _.reduce(
    mappedSalaries,
    function(result, value) {
      (result[value.country] || (result[value.country] = [])).push(
        value.salary,
      );
      return result;
    },
    {},
  );

const value = _.mapValues(combined, values => {
  return _.mean(values);
});

const failures = _.chain(summary.failures)
  .map((count, key) => {
    return {count, key};
  })
  .sortBy(entry => entry.count)
  .takeRight(5)
  .value();

console.log(failures);

console.log('success', summary.success, 'vs failures', summary.failure);

const salaries = _.reduce(
  data,
  function(result, value) {
    if (result[value.country]) {
      if(result[value.country][value.salary]) {
      result[value.country][value.salary] += 1;
      } else {

      result[value.country][value.salary] = 1;
      }
    } else {
      result[value.country] = {};
      result[value.country][value.salary] = 1;
    }

    return result;
  },
  {},
);

fs.writeFileSync('js-binned-wages.json', JSON.stringify(value), 'utf8');

fs.writeFileSync('js-country-wage.json', JSON.stringify(value), 'utf8');
