#!/usr/bin/env node

const child_process = require('child_process');
const columnify = require('columnify');
const csvParse = require('csv-parse/lib/sync');

const commander = require('commander')
  .arguments('[keyword]');

commander.parse(process.argv);

const keywords = commander.args

let results = child_process.execSync('ss -atunp').toString().trim().split('\n');
let headers = results.shift().trim()
  .replace(/ Address/, 'Address')
  .replace(/ Address/, 'Address')
  .split(/ +/);

let tsv = headers.join('\t') + '\n';

results.forEach((line) => {
  if (keywords && line.match(keywords[0])) {
    fields = line.trim().split(/ +/);
    fields[4] = fields[4].replace(/.*:/, '');
    fields[5] = fields[5].replace(/.*:/, '');
    if (fields[6]) {
      fields[6] = fields[6].replace(/^users:\(\("(.*)",pid=(\d+).*\)\)$/, '$1($2)');
    }
    const length_diff = headers.length - fields.length;
    tsv += fields.join('\t');
    for (let i = 0; i < length_diff; i++) {
      tsv += '\t';
    }
    tsv += '\n';
  }
});

tsv = columnify(csvParse(tsv, { columns: true, delimiter: '\t', relax: true }), {
  showHeaders: true,
  headingTransform: (x) => x
}).replace(/\s+$/gm, '');

console.log(tsv);
