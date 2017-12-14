const cuid = require('cuid')

const uuid = {
  generate: () => cuid()
}

module.exports.uuid = uuid
