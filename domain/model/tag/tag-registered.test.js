const test = require('tape')
const tagRegistered = require('./tag-registered')

test('tag-registered event', assert => {
  const message = 'should be valid'

  const version = 9
  const name = 'test'
  const date = Date.now()
  const rules = ['%test%']
  const author = 'test'

  const actual = tagRegistered({version, name, date, rules, author})
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
