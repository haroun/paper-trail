const test = require('tape')
const tag = require('./tag')
const registerTag = require('./register-tag')
const tagRegistered = require('./tag-registered')

test('register a tag', assert => {
  const message = 'should returns tag-registered event'

  const version = 1
  const name = 'caf'
  const date = Date.now()
  const rules = ['CAF']
  const author = 'test'

  const actual = tag().handle({
    command: registerTag({
      version,
      name,
      date,
      rules,
      author
    })
  })
  const expected = {
    version,
    type: tagRegistered.TYPE,
    occurredAt: date,
    noticedAt: actual.noticedAt,
    isProcessed: actual.isProcessed,
    attributes: {
      name,
      rules,
      author
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

// test('register for multiple owner', assert => {
//   const message = 'should contains the newly registered tag'
//
//   const tagsOwner1 = tag()
//   const tagsOwner2 = tag()
//   tagsOwner1.register({name: 'caf', owner: {firstname: 'test', lastname: 'test'}})
//
//   const actual = tagsOwner2.all().indexOf('caf') === -1
//   const expected = true
//
//   assert.equal(actual, expected, message)
//
//   assert.end()
// })

test('tags list', assert => {
  const ownerTag = tag()

  ownerTag.apply({event: tagRegistered({
    version: 1,
    name: 'test',
    date: Date.now(),
    rules: ['test'],
    author: 'test'
  })})

  const message = 'should have test tag'

  const actual = ownerTag.tags()
  const expected = [
    {name: 'test', rules: ['test'], author: 'test'}
  ]

  assert.deepEqual(actual, expected, message)

  assert.end()
})
