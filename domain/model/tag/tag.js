const aggregate = require('./../aggregate')
const tagRegistered = require('./tag-registered')
const registerTag = require('./register-tag')

const tagMixin = (defaults = []) => {
  const tags = []

  const register = ({version, name = '', date, rules = [], author = ''}) => {
    if (name === '') {
      throw new TypeError('name MUST be filled')
    }
    if (!date) {
      throw new TypeError('date MUST be filled')
    }
    if (author === '') {
      throw new TypeError('owner MUST be filled')
    }
    if (!Array.isArray(rules) || (rules.length || 0) === 0) {
      throw new TypeError('rules MUST be an array')
    }
    if (tags.indexOf(name) !== -1) {
      throw new TypeError('name already exist')
    }

    return tagRegistered({version, name, date, rules, author})
  }

  const applyTagRegistered = event => {
    tags.push({
      name: event.attributes && event.attributes.name,
      rules: event.attributes && event.attributes.rules,
      author: event.attributes && event.attributes.author
    })

    return tags
  }

  return Object.freeze(
    Object.assign(
      {},
      aggregate,
      {
        tags: () => [...defaults, ...tags],

        handle: ({command}) => {
          const {type = ''} = command

          return (type === registerTag.TYPE && register(command))
            || (() => {
              throw new TypeError(`Unknown "${type}" command`)
            })
        },

        apply: ({event}) => {
          const {type = ''} = event

          return (type === tagRegistered.TYPE && applyTagRegistered(event))
            || (() => {
              throw new TypeError(`Unknown "${type}" event`)
            })
        }
      }
    )
  )
}

module.exports = tagMixin
