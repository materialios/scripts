const fs = require('fs')
const path = require('path')
const lsSync = require('@mnrendra/lssync')

const _ = path.sep
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1 < 10 ? '0' + now.getMonth() + 1 : now.getMonth() + 1
const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
const timeStamp = `${year}${month}${date}.${hour}${minute}${second}`

const takeOut = ({
  srcDir = `.${_}src`,
  arcDir = `.${_}src${_}archive`,
  fileName = 'index',
  fileExt = '.css'
}) => {
  const file = fileName + fileExt
  const srcDirFile = `${srcDir}${_}${file}`
  const arcDirFile = `${arcDir}${_}${file}`
  if (!fs.existsSync(arcDir)) fs.mkdirSync(arcDir)
  if (!fs.existsSync(srcDirFile)) return
  const srcData = fs.readFileSync(srcDirFile, 'utf8')
  if (!fs.existsSync(arcDirFile)) fs.renameSync(srcDirFile, arcDirFile)
  else {
    const arcFiles = lsSync(arcDir)
    for (const arcFile in arcFiles) {
      if (arcFile.extension === fileExt && arcFile.path.includes(`${_}${fileName}`)) {
        const arcData = fs.readFileSync(`${arcDir}${_}${arcFile.file}`, 'utf8')
        if (arcData === srcData) {
          fs.unlinkSync(srcDirFile)
          break
        } else {
          fs.renameSync(srcDirFile, `${arcFile.directory}${fileName}.${timeStamp}${fileExt}`)
        }
      }
    }
  }
}

const takeIn = ({
  tmpDir = `.${_}node_modules${_}@materialios${_}scripts${_}templates`,
  srcDir = `${_}src`,
  fileName = 'index',
  fileExt = '.css'
}) => {
  const file = `${fileName}${fileExt}`
  const tmpDirFile = `${tmpDir}${_}${file}`
  const srcDirFile = `${srcDir}${_}${file}`
  if (!fs.existsSync(tmpDirFile)) return
  const fileData = fs.readFileSync(tmpDirFile, 'utf8')
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
    takeOut({
      fileName: name,
      fileExt: ext
    })
  })

  files.forEach(({ name, ext }) => {
    takeIn({
      fileName: name,
      fileExt: ext
    })
  })
}

module.exports = initIndexAndApp
