const assert = require('assert').strict

const tagMixin = ({name = null}) => {
  const state = {
    name
  }

  assert.ok(state.name, 'name is empty')
  assert.ok(typeof state.name === 'string', 'name must be a string')

  return Object.freeze(state)
}

module.exports = tagMixin
