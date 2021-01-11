#!/usr/bin/env node

const child_process = require('child_process');
// fs = require('fs');
// spfmt = require('../lib/spfmt.js');

const commander = require('commander')
      // .option('-i, --indent <DEPTH>', "indent depth", 2)
      // .option('-d, --debug', 'debug (output AST)')
      // .version(require("../package.json").version)
      .arguments('[SPARQL]');

commander.parse(process.argv);

// const result = swawnSync('ss');
const result = child_process.execSync('ss -atunp').toString();
console.log(result);
