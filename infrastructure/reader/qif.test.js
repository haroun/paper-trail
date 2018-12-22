const test = require('tape')
const qif = require('./qif')

test('parse qif file', assert => {
  const message = 'should return an array of accounting entry'

  const actual = qif.parse('./fixtures/input.qif')
  const expected = [
    {
      date: 1514674800000,
      amount: -4760,
      description: 'CARTE 25/11/2017 XXXX XXXX XXXX'
    },
    {
      date: 1512514800000,
      amount: -5000,
      description: 'RETRAIT DAB 03/12/2017 XXXX XXXX XXXX'
    },
    {
      date: 1512428400000,
      amount: -1950,
      description: 'PRLV SEPA XXXX XXXX : XXXX XXXX : XXXX XXXX'
    },
    {
      date: 1512082800000,
      amount: 317549,
      description: 'VIREMENT SEPA RECU XXXX XXXX XXXX'
    }
  ]

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('invalid qif file', assert => {
  const message = 'should return an empty array'

  const actual = qif.parse('./fixtures/invalid.qif')
  const expected = []

  assert.deepEqual(actual, expected, message)

  assert.end()
})
