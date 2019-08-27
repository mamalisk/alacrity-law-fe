# Alacrity Law Frontend

For installation simply on a console run `yarn`.


In order to start the app you can run:

```
    yarn start
```

This requires the Backend service to be working. Otherwise a pertinent error is displayed.

For testing

```
    yarn test
```

Due to lack of time I haven't added all the necessary tests both enzyme and cypress. Also as a refactoring point I would extract the create and edit form and create a single `UpsertForm` which would take an object for the default values (or empty object for the create) and a `MutationFn` as a parameter as Edit and Create views as almost identical aside the 2 aforementioned attributes.
