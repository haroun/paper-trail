const tagMixin = (owner = []) => {
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
    all: () => [...defaults, ...owner],
    register: ({name}) => { // FIXME add owner for event
      // FIXME dispatch tag-registered event
      owner = owner.concat(name)
    }
  }
}

module.exports = tagMixin
