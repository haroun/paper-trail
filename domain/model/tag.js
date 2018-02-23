const tagRegistered = require('./tag-registered')

const tagMixin = (tags = []) => {
  const defaults = [
    'salary',
    'bank',
    'insurance',
    'electricity',
    'water',
    'rent',
    'cloth',
    'transport',
    'health',
    'car',
    'food',
    'withdrawal',
    'outing',
    'leisure',
    'vacation',
    'transfer',
    'saving',
    'check',
    'tax',
    'nursery',
    'subscription'
  ]

  return {
    all: () => [...defaults, ...tags],
    register: ({name, owner}) => {
      tags = tags.concat(name)

      return tagRegistered({name, owner})
    }
  }
}

module.exports = tagMixin
