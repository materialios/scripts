const fs = require('fs')
const path = require('path')
const lsSync = require('@mnrendra/lssync')

const _ = path.sep

const takeOut = (fileName = 'index', fileExt = '.css') => {
  const srcDir = `.${_}src${_}`
  const archiveDir = `${srcDir}${'archive'}${_}`
  const file = fileName + fileExt

  if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir)

  if (!fs.existsSync(`${srcDir}${file}`)) return

  if (!fs.existsSync(`${archiveDir}${file}`)) fs.renameSync(`${srcDir}${file}`, `${archiveDir}${file}`)
  else {
    const srcData = fs.readFileSync(`${srcDir}${file}`, 'utf8')

    const archiveFiles = lsSync(archiveDir)
    archiveFiles.forEach((archiveFile) => {
      if (archiveFile.extension === fileExt && archiveFile.path.includes(`${_}${fileName}`)) {
        const archivedDate = fs.readFileSync(`${archiveDir}${archiveFile.file}`, 'utf8')
        if (archivedDate === srcData) {
          fs.renameSync(archiveFile.path, `${archiveFile.directory}${fileName}.${new Date().getTime()}${fileExt}`)
          fs.unlinkSync(`${srcDir}${file}`)
        } else {
          fs.renameSync(`${srcDir}${file}`, `${archiveFile.directory}${fileName}.${new Date().getTime()}${fileExt}`)
        }
      }
    })
  }
}

const takeIn = (file = 'index.css') => {
  const _Dir = `.${_}node_modules${_}@materialios${_}scripts${_}lib${_}initIndexAndApp${_}templates${_}`
  const _DirFile = `${_Dir}${file}`

  if (!fs.existsSync(_DirFile)) return

  const srcDir = `.${_}src${_}`
  const srcDirFile = `${srcDir}${file}`

  const fileData = fs.readFileSync(_DirFile, 'utf8')
  fs.writeFileSync(srcDirFile, fileData)
}

const files = [
  { name: 'index', ext: '.js' },
  { name: 'index', ext: '.css' },
  { name: 'App', ext: '.js' },
  { name: 'App', ext: '.css' }
]

const initIndexAndApp = () => {
  files.forEach(({ name, ext }) => {
    takeOut(name, ext)
  })

  files.forEach(({ name, ext }) => {
    takeIn(name, ext)
  })
}

module.exports = initIndexAndApp
