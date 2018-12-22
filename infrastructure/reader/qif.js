const fs = require('fs')

const NEWLINE_REGEX = /\r?\n|\u2028|\u2029/

// Load a file
// load :: (String) -> String
const load = file => fs.readFileSync(file)

// Split
// split :: (String, String) -> [String]
const split = (content, separator) => content.toString().split(separator)

// Convert to cents
// toCents :: String -> Number
// toCents :: Number -> Number
const toCents = amount => parseFloat(amount, 10) * 100

// Read file
// read :: (Object, Object) -> Object
const read = (item, mapper) => item
  .filter(line => Object.keys(mapper).indexOf(line.charAt(0)) !== -1)
  .reduce((acc, line) => {
    const code = line.charAt(0)
    const value = mapper[code] === 'amount'
      ? toCents(line.slice(1))
      : mapper[code] === 'date'
      ? Date.parse(line.slice(1))
      : line.slice(1)
    const entry = {
      [mapper[code]]: value
    }

    return {...acc, ...entry}
  }, {})

// Parse
// parse :: (String, {D: String, T: String, P: String}, String) -> [{date: Number, amount: Number, description: String}]
// parse :: (String, Object, String) -> [Object]
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
