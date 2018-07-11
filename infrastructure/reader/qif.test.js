const test = require('tape')
const qif = require('./qif')

test('parse qif file', assert => {
  const message = 'should return an array of accounting entry'

  const actual = qif.parse('./fixtures/input.qif')
  const expected = [
    {
      date: '31/12/2017',
      amount: -4760,
      description: 'CARTE 25/11/2017 UNIQLO LYON CAR'
    },
    {
      date: '06/12/2017',
      amount: -5000,
      description: 'RETRAIT DAB 03/12/2017 LYON GROS CAILLOU'
    },
    {
      date: '05/12/2017',
      amount: -1950,
      description: 'PRLV SEPA FIECI CGC : FR53ZZZ003421 ++80117620 DE FIECI CGC : ++80117620 FR53ZZZ003421'
    },
    {
      date: '01/12/2017',
      amount: 317549,
      description: 'VIREMENT SEPA RECU SCIENTIFIC GAMES FRANCE SALAIRE 2017 11'
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
