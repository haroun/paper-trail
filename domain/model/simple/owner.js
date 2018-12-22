const assert = require('assert').strict
const url = require('url')

const EMAIL_REGEX = /\S+@\S+\.\S+/
const CHANGE_AVATAR = 'OWNER::CHANGE_AVATAR'
const CHANGE_EMAIL = 'OWNER::CHANGE_EMAIL'

const ownerMixin = ({username, avatar = null, email}) => {
  const state = {
    username,
    avatar,
    email
  }

  assert.ok(state.username, 'username is empty')
  assert.ok(url.parse(String(avatar)).host, `Invalid avatar, expecting "url" format, received ${avatar}`)
  assert.ok(EMAIL_REGEX.test(state.email), `Invalid email, expected "test@test.test" format, received ${email}`)

  return Object.freeze(state)
}

const update = ({state, action = {}}) => {
  const {type, data} = action
  switch (type) {
    case CHANGE_AVATAR:
      return ownerMixin({...state, avatar: data})
    case CHANGE_EMAIL:
      return ownerMixin({...state, email: data})
    default:
      return Object.freeze({...state})
  }
}

module.exports = ownerMixin
module.exports.update = update
module.exports.CHANGE_AVATAR = CHANGE_AVATAR
module.exports.CHANGE_EMAIL = CHANGE_EMAIL
