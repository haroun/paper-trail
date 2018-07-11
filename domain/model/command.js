const commandMixin = ({version, type}) => Object.freeze({
  version,
  type
})

module.exports = commandMixin
