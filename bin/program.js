#!/usr/bin/env node

const App = require('../src/index.js')
const options = require('yargs/yargs')(process.argv.slice(2)).argv

var app = new App(options)
app.print(console.log)

// TODO: Clean-up test names
// TODO: Update documentation for use with args
// TODO: Test using powershell script updates
// TODO: Push npm package
