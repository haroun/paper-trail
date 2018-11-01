const test = require('tape')
const registerTag = require('./register-tag')

test('register-tag command', assert => {
  const message = 'should be valid'

  const version = 9
  const name = '123'
  const date = Date.now()
  const rules = ['%test%']
  const author = 'test'

  const actual = registerTag({version, name, date, rules, author})
  const expected = {
    version,
    type: registerTag.TYPE,
    name,
    date,
    rules,
    author
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
