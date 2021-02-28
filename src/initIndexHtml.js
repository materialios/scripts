const fs = require('fs')
const path = require('path')
const _ = path.sep

const START_OF_LINE = '<!-- @materialios - start of line -->'
const END_OF_LINE = '<!-- @materialios - end of line -->'

/**
 * initIndexHtml
 * @param {Array} newLines supposed to be list of additional html tag
 * @param {Object} options { indexHtmlFile: 'supposed to be ./public/index.html path.' }
 */
const initIndexHtml = (newLines = [], options = {}) => {
  const { indexHtmlFile = `.${_}public${_}index.html` } = options

  if (!fs.existsSync(indexHtmlFile)) throw new Error(indexHtmlFile + ' doesn\' exist!')

  const indexHtml = fs.readFileSync(indexHtmlFile, 'utf8')
  const eachLines = indexHtml.split('\n')

  let newIndex = ''

  const addingStartOfLine = (indent = '') => {
    if (!indexHtml.includes(START_OF_LINE)) {
      const startOfLine = indent + START_OF_LINE
      newIndex = newIndex + startOfLine + '\n'
    }
  }

  const addingEndOfLine = (indent = '') => {
    if (!indexHtml.includes(END_OF_LINE)) {
      const endOfLine = indent + END_OF_LINE
      newIndex = newIndex + endOfLine + '\n'
      return endOfLine
    }
  }

  eachLines.forEach((eachLine, i) => {
    if (eachLine.includes('</head>')) {
      const indent = eachLines[i - 1].split('<')[0]
      addingStartOfLine(indent)
      newLines.forEach((newLine) => {
        if (!indexHtml.includes(newLine)) {
          const endOfLine = addingEndOfLine(indent)
          const beforeEndOfLine = newIndex.split(endOfLine)[0]
          newIndex = beforeEndOfLine + indent + newLine + '\n'
        }
      })
      addingEndOfLine(indent)
    }

    if (i < eachLines.length - 1) {
      newIndex = newIndex + eachLine + '\n'
    } else {
      if (eachLine === '') {
        newIndex = newIndex + eachLine
      } else {
        newIndex = newIndex + eachLine + '\n'
      }
    }
  })

  fs.unlinkSync(indexHtmlFile)

  fs.writeFileSync(indexHtmlFile, newIndex)
}

module.exports = initIndexHtml
