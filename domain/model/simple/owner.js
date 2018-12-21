const assert = require('assert').strict
const url = require('url')

const emailRegex = /\S+@\S+\.\S+/
const UPDATE_AVATAR = 'UPDATE:AVATAR'
const UPDATE_EMAIL = 'UPDATE:EMAIL'

const ownerMixin = ({username, avatar = null, email}) => {
  const state = {
    username,
    avatar,
    email
  }

  assert.ok(state.username, 'username is empty')
  assert.ok(url.parse(String(avatar)).host, `Invalid avatar, expecting "url" format, received ${avatar}`)
  assert.ok(emailRegex.test(state.email), `Invalid email, expected "test@test.test" format, received ${email}`)

  return Object.freeze(state)
}

const update = ({state, action = {}}) => {
  const {type, data} = action
  switch (type) {
    case UPDATE_AVATAR:
      return ownerMixin({...state, avatar: data})
    case UPDATE_EMAIL:
      return ownerMixin({...state, email: data})
    default:
      return Object.freeze({...state})
  }
}

module.exports = ownerMixin
module.exports.update = update
module.exports.UPDATE_AVATAR = UPDATE_AVATAR
module.exports.UPDATE_EMAIL = UPDATE_EMAIL
