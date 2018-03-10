# paper-trail

> Follow the paper-trail

Sometimes, like some of us, I buy stuff.
I like to have an overview of how much I spent every month, but I don't like to tag each entry over and over again. That, was what my bank offers.

I need the insight, I don't want ever to spent few hours at the end of each month to figure this out.
I did it a few times, and I found the process kind of boring and repetitive.

Here comes `paper-trail`.
The idea, because we live in a "monde de bisounours" is to provide a PDF file with all the accounting transactions of the month and then tag each entries.
Next month I provide and new file, and I tag only new entries.
`paper-trail` is smart enough to figure out that one entry looks similar to a previous and tag it automatically.

`paper-trail` uses event-sourcing in its core, somewhere.

## Structure

*   [ ] Owner
  *   [ ] register(firstname, lastname) => owner-registered (firstname, lastname, occuredAt)
*   [ ] Account
  *   [ ] open(number, name, owner, initialBalance) => account-opened (number, name, owner, initialBalance, occuredAt)
  *   [ ] sync(transactions) => account-synced(number, transactions, occuredAt)
  *   [ ] deposit(amount, description, occuredAt) => account-deposited (number, transactionHash, hash, amount, description, occuredAt, noticedAt)
  *   [ ] withdraw(amount, description, occuredAt) => account-withdrawn (number, transactionHash, amount, description, occuredAt, noticedAt)
*   [x] Tag
  *   [x] register(name, owner) => tag-registered(name, owner, occuredAt)
*   [ ] Rule
  *   [ ] register(name, match, tag, owner) => rule-registered (name, match, tag, owner, occuredAt)
*   [ ] Transaction
  *   [ ] applyRule(rule) => rule-applied(rule)

UserInterface
  Command
    SyncAccount: payload => ({name: 'sync-account', payload})
Infrastructure
  Repository: store events
Application
  Command Handlers: validate the command, use the repository to load the aggregate, call domain model, persist new events
Domain
  Model: check business rules, return event or throw error if broken
    handle command & apply event
