#!/usr/bin/env node

const {
  initImportFonts,
  initIndexAndApp
} = require('../lib')

const { argv } = process

let isInitImportFonts = false
let isInitIndexAndApp = false

argv.forEach(arg => {
  if (arg.includes('--init-fonts')) isInitImportFonts = true
  if (arg.includes('--init-index-app')) isInitIndexAndApp = true
})

isInitImportFonts && initImportFonts()
isInitIndexAndApp && initIndexAndApp()
