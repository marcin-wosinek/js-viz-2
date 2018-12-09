#!/usr/bin/env node

const fs = require('fs'),
  data = require('./sojs18')
    .map(entry => {
      return {
        salary: entry.about_you_yearly_salary,
        country: entry.about_you_your_country,
      };
    });

fs.writeFileSync(
  'js-salary-country.json',
  JSON.stringify(data),
  'utf8');
