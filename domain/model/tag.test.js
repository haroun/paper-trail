const test = require('tape')
const tag = require('./tag')

test('register', assert => {
  const message = 'should contains the newly registered tag'

  const tags = tag()
  tags.register({name: 'caf', owner: {firstname: 'test', lastname: 'test'}})

  const actual = tags.all().indexOf('caf') !== -1
  const expected = true

  assert.equal(actual, expected, message)

  assert.end()
})

test('register for multiple owner', assert => {
  const message = 'should contains the newly registered tag'

  const tagsOwner1 = tag()
  const tagsOwner2 = tag()
  tagsOwner1.register({name: 'caf', owner: {firstname: 'test', lastname: 'test'}})

  const actual = tagsOwner2.all().indexOf('caf') === -1
  const expected = true

  assert.equal(actual, expected, message)

  assert.end()
})

test('register event', assert => {
  const message = 'should return a tag-registered event'

  const tags = tag()

  const actual = tags.register({name: 'caf', owner: {firstname: 'test', lastname: 'test'}}).name
  const expected = 'tag-registered'

  assert.equal(actual, expected, message)

  assert.end()
})
