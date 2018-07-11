const events = []
let version = -1

const load = (history, handler) => {
  history.reduce((acc, event) => {
    events.push(event)
    handler(event);
    ({version} = event)

    return null
  }, null)
}

const aggregate = {
  version,
  events,
  load
}

module.exports = aggregate
