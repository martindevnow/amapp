# AMApp

This is an tool to make hosting real-time AMAs more intuitive.

## Technologies

React w/ Typescipt, Redux, and Emotion (CSS in JS)

Cloud: Firebase

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Firebase

This project uses firebase. As such, the keys are within this repo and are bundled with the client application. There are also cloud functions being used to provide security.

### Firebase Functions

Some tasks are performed in response to events occuring in the database. For example, a table: `roles` can only be written to by the cloud functions. This prevents users from editing their roles, and allows these roles to be used in the `firestore.rules` file

### Firebase Aliases

// TODO: Set `default` to `dev` and make `prod` the alias. Then, set up a pipeline, perhaps.

By default, the `yarn deploy` script sets the `--project=dev` for deploying to dev. Protection can be provided her by restricting access to the `tw-amapp` GCP project.
