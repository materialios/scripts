#!/usr/bin/env node

const {
  initImportFonts
} = require('../lib')

const { argv } = process

let isInitImportFonts = false

argv.forEach(arg => {
  if (arg.includes('--init-fonts')) isInitImportFonts = true
})

isInitImportFonts && initImportFonts()
