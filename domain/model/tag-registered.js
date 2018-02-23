const event = require('./event')

const tagRegistered = ({name, owner}) => Object.assign(
  {},
  event,
  {
    name: 'tag-registered',
    attributes: {
      name,
      owner
    }
  }
)

module.exports = tagRegistered
