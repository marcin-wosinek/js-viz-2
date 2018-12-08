#!/usr/bin/env node

const _ = require('lodash'),
  fs = require('fs'),
  d3Dsv = require('d3-dsv');

const file = fs.readFileSync('./DP_LIVE_08122018193323667.csv', 'utf8');

const data = d3Dsv.csvParse(file),
  value = _.reduce(
    data,
    function(result, value) {
      const location = value['﻿"LOCATION"'],
        year = value['TIME'];

      if (!result[location]) {
        result[location] = {
          wage: value['Value'],
          year
        };
      } else if (year > result[location].year) {
        result[location] = {
          wage: value['Value'],
          year
        };
      }

      return result;
    },
    {},
  );

fs.writeFileSync(
  'country-wage.json',
  JSON.stringify(value),
  'utf8');
