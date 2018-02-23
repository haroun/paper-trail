const test = require('tape')
const tagRegistered = require('./tag-registered')

test('event', assert => {
  const message = 'should return a tag-registered event'

  const actual = tagRegistered({name: 'test', owner: {firstname: 'test', lastname: 'test'}})
  const expected = {
    name: 'tag-registered',
    attributes: {
      name: 'test',
      owner: {
        firstname: 'test',
        lastname: 'test'
      }
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
