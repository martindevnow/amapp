## Firebase

This project uses firebase. As such, the keys are within this repo and are bundled with the client application. There are also cloud functions being used to provide security.

### Firebase Functions

Some tasks are performed in response to events occurring in the database. For example, a table: `roles` can only be written to by the cloud functions. This prevents users from editing their roles, and allows these roles to be used in the `firestore.rules` file

### Firebase Aliases

// TODO: Set `default` to `dev` and make `prod` the alias. Then, set up a pipeline, perhaps.

By default, the `yarn deploy` script sets the `--project=dev` for deploying to dev. Protection can be provided her by restricting access to the `tw-amapp` GCP project.
