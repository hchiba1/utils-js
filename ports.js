#!/usr/bin/env node

const child_process = require('child_process');
const columnify = require('columnify');
const csvParse = require('csv-parse/lib/sync');

const commander = require('commander')
  .arguments('[keyword]');

commander.parse(process.argv);

let results = child_process.execSync('ss -atunp').toString().trim().split('\n');
let headers = results.shift().trim()
  .replace(/ Address/, 'Address')
  .replace(/ Address/, 'Address')
  .split(/ +/);

let tsv = headers.join('\t') + '\n';

results.forEach((line) => {
  fields = line.trim().split(/ +/);
  const length_diff = headers.length - fields.length;
  tsv += fields.join('\t');
  if (length_diff) {
    tsv += '\t';
  }
  tsv += '\n';
});

tsv = columnify(csvParse(tsv, { columns: true, delimiter: '\t', relax: true }), {
  showHeaders: true,
  headingTransform: (x) => x
}).replace(/\s+$/gm, '');

console.log(tsv);
