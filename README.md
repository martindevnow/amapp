# AMApp

This is an tool to make hosting real-time AMAs more intuitive. It also supports VoD streaming of the recording of past AMAs.

## Technologies

React w/ TypeScript, Redux, and Styled-Components

Cloud: Firebase [Read More](docs/firebase.md)

Video: Hls [Read More](docs/video.md)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and thus supports `yarn start`, `yarn build`, and `yarn test`.

## Additional Available Scripts

In the project directory, you can run:

### `yarn install:function`

Convenience function to install dependencies for the firebase functions.

### `yarn deploy`, `yarn deploy:func`, and `yarn deploy:rules`

Convenience functions for testing in `dev` environment. Deploys the app, or a subset thereof.
