const test = require('tape')
const owner = require('./owner')

test('owner happy path', assert => {
  const message = 'should return an owner'

  const actual = owner({
    username: 'test',
    avatar: 'http://localhost/test',
    email: 'test@test.com'
  })
  const expected = {
    username: 'test',
    avatar: 'http://localhost/test',
    email: 'test@test.com'
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('owner with empty username', assert => {
  const message = 'should return a username is empty error'

  try {
    owner({
      username: null,
      avatar: 'http://localhost/test',
      email: 'test@test.com'
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'username is empty'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('owner with invalid avatar', assert => {
  const message = 'should return an invalid avatar error'

  try {
    owner({
      username: 'test',
      avatar: null,
      email: 'test@test.com'
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'Invalid avatar, expecting "url" format, received null'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('owner with invalid email', assert => {
  const message = 'should return an invalid email error'

  try {
    owner({
      username: 'test',
      avatar: 'http://localhost/test',
      email: null
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'Invalid email, expected "test@test.test" format, received null'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('owner update avatar', assert => {
  const message = 'should return owner with new avatar'

  const testOwner = owner({
    username: 'test',
    avatar: 'http://localhost/test',
    email: 'test@test.com'
  })
  const action = {type: owner.CHANGE_AVATAR, data: 'http://localhost/2'}

  const actual = owner.update({state: testOwner, action})
  const expected = {
    username: 'test',
    avatar: 'http://localhost/2',
    email: 'test@test.com'
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(testOwner, actual, 'should not mutate original owner')

  assert.end()
})

test('owner update email', assert => {
  const message = 'should return owner with new email'

  const testOwner = owner({
    username: 'test',
    avatar: 'http://localhost/test',
    email: 'test@test.com'
  })
  const action = {type: owner.CHANGE_EMAIL, data: 'test2@test.com'}

  const actual = owner.update({state: testOwner, action})
  const expected = {
    username: 'test',
    avatar: 'http://localhost/test',
    email: 'test2@test.com'
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(testOwner, actual, 'should not mutate original owner')

  assert.end()
})
