const event = require('./../event')

const TYPE = 'tag-registered'

const tagRegistered = ({version, name, date, rules, author}) => Object.freeze(
  Object.assign(
    {},
    event({version, type: TYPE, occurredAt: date}),
    {
      attributes: {
        name,
        rules,
        author
      }
    }
  )
)

module.exports = tagRegistered
module.exports.TYPE = TYPE
