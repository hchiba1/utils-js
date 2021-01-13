#!/usr/bin/env node

const child_process = require('child_process');
const columnify = require('columnify');
const csvParse = require('csv-parse/lib/sync');
// fs = require('fs');
// spfmt = require('../lib/spfmt.js');

const commander = require('commander')
      // .option('-i, --indent <DEPTH>', "indent depth", 2)
      // .option('-d, --debug', 'debug (output AST)')
      // .version(require("../package.json").version)
      .arguments('[SPARQL]');

commander.parse(process.argv);

let result = child_process.execSync('ss -atunp').toString();
// result = result.replace(/ Address/, 'Address');
// result = result.replace(/ Address/, 'Address');
// result = result.replace(/ +/g, '\t');

const results = result.trim().split('\n');
let headers = results.shift().trim()
    .replace(/ Address/, 'Address')
    .replace(/ Address/, 'Address')
    .split(/ +/);

let tsv = headers.join('\t') + '\n';

results.forEach(line => {
  fields = line.trim().split(/ +/);
  const length_diff = headers.length - fields.length;
  tsv += fields.join('\t');
  if (length_diff) {
    tsv += '\t';
  }
  tsv += '\n';
});

tsv = columnify(csvParse(tsv, { columns: true, delimiter: '\t', relax: true}), {
  showHeaders: true,
  headingTransform: (x) => x
}).replace(/\s+$/gm, '');

process.stdout.write(tsv);
