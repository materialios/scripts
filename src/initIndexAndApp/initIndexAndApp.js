const fs = require('fs')
const path = require('path')
const lsSync = require('@mnrendra/lssync')

const _ = path.sep

const takeOut = (file = 'index.css') => {
  const srcDir = `.${_}src${_}`
  const archiveDir = `${srcDir}${'archive'}${_}`

  if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir)

  if (!fs.existsSync(`${srcDir}${file}`)) return

  if (!fs.existsSync(`${archiveDir}${file}`)) fs.renameSync(`${srcDir}${file}`, `${archiveDir}${file}`)
  else {
    const archivedIndexJs = fs.readFileSync(`${archiveDir}${file}`, 'utf8')
    const indexJs = fs.readFileSync(`${srcDir}${file}`, 'utf8')

    const archiveFiles = lsSync(archiveDir)
    console.log('archiveFiles', archiveFiles)

    if (indexJs === archivedIndexJs) fs.unlinkSync(`${srcDir}${file}`)
    else {
      const byDot = file.split('.')
      fs.renameSync(
        `${srcDir}${file}`,
        `${archiveDir}${byDot[byDot.length - 2]}.${new Date().getTime()}${'.'}${byDot[byDot.length - 1]}`
      )
    }
  }
}

const takeIn = (file = 'index.css') => {
  const _Dir = `.${_}lib${_}initIndexAndApp${_}templates${_}`
  const _DirFile = `${_Dir}${file}`

  if (!fs.existsSync(_DirFile)) return

  const srcDir = `.${_}src${_}`
  const srcDirFile = `${srcDir}${file}`

  const fileData = fs.readFileSync(_DirFile, 'utf8')
  fs.writeFileSync(srcDirFile, fileData)
}

const files = [
  'index.js',
  'index.css',
  'App.js',
  'App.css'
]

const initIndexAndApp = () => {
  files.forEach(file => {
    takeOut(file)
  })

  files.forEach(file => {
    takeIn(file)
  })
}

module.exports = initIndexAndApp
