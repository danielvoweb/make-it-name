#!/usr/bin/env node

const App = require('../src/index.js')
const options = require('yargs/yargs')(process.argv.slice(2)).argv

var app = new App(options)
app.print(console.log)
