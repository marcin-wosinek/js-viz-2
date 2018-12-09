#!/usr/bin/env node

const _ = require('lodash'),
  fs = require('fs'),
  {normalizeCountry, summary} = require('./normalize-country'),
  data = require('./js-salary-country.json')
    .filter(entry => entry.salary && entry.country)
    .map(entry => {
      return {
        country: normalizeCountry(entry.country),
        salary: entry.salary
      };
    }),
  mappedSalaries = data
    .map(entry => {
      switch (entry.salary) {
        case 'I work for free :(':
          entry.salary = 0;
          break;
        case '$0-$10k':
          entry.salary = 5000;
          break;
        case '$10k-$30k':
          entry.salary = 20000;
          break;
        case '$30k-$50k':
          entry.salary = 40000;
          break;
        case '$50k-$100k':
          entry.salary = 75000;
          break;
        case '$100k-$200k':
          entry.salary = 150000;
          break;
        case '$200k+':
          entry.salary = 250000;
      }
      return entry;
    }),
  combined = _.reduce(
    mappedSalaries,
    function(result, value) {
      (result[value.country] || (result[value.country] = [])).push(value.salary);
      return result;
    },
    {},
  );

const value = _.mapValues(combined, values => {
  return _.mean(values);
});

console.log('success', summary.success, 'vs failures', summary.failure)

fs.writeFileSync(
  'js-country-wage.json',
  JSON.stringify(value),
  'utf8');
