const command = require('../command')

const TYPE = 'register-tag'

const registerTag = ({version, name, date, rules, author}) => Object.freeze(
  Object.assign(
    {},
    command({version, type: TYPE}),
    {
      type: TYPE,
      name,
      date,
      rules,
      author
    }
  )
)

module.exports = registerTag
module.exports.TYPE = TYPE
