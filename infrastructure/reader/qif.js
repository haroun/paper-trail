const fs = require('fs')

// TODO: transform amount in cents

const NEWLINE_REGEX = /\r?\n|\u2028|\u2029/

const load = file => fs.readFileSync(file)
const split = (content, separator) => content.toString().split(separator)
const toCents = amount => parseFloat(amount, 10) * 100
const read = (item, mapper) => item
  .filter(line => Object.keys(mapper).indexOf(line.charAt(0)) !== -1)
  .reduce((acc, line) => {
    const code = line.charAt(0)
    const value = mapper[code] === 'amount' ? toCents(line.slice(1)) : line.slice(1)
    const entry = {
      [mapper[code]]: value
    }

    return Object.assign({}, acc, entry)
  }, {})

const parse = (file, mapper = {D: 'date', T: 'amount', P: 'description'}, separator = '^') => {
  let content

  try {
    content = split(load(file), separator)
  } catch (err) {
    content = []
  }

  return content
    .filter(item => item.trim() !== '')
    .map(item => read(split(item, NEWLINE_REGEX), mapper))
    .filter(item => Object.keys(item).length > 0)
}

module.exports.parse = parse
