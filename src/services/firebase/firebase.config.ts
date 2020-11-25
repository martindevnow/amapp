/* eslint-disable @typescript-eslint/no-unused-vars */

const prodFirebaseConfig = {
  apiKey: "AIzaSyDT7d0jSFatYs82elA5vo8bmjkVNG5fCws",
  authDomain: "tw-amapp.firebaseapp.com",
  databaseURL: "https://tw-amapp.firebaseio.com",
  projectId: "tw-amapp",
  storageBucket: "tw-amapp.appspot.com",
  messagingSenderId: "178599001067",
  appId: "1:178599001067:web:226f12f85d64a993d6b7ae",
  measurementId: "G-H1TKX5EQ8K",
};

const devFirebaseConfig = {
  apiKey: "AIzaSyAXmg-XFoCSi4bvs5sHjUApIsTIo6jk3EA",
  authDomain: "tw-amapp-dev.firebaseapp.com",
  databaseURL: "https://tw-amapp-dev.firebaseio.com",
  projectId: "tw-amapp-dev",
  storageBucket: "tw-amapp-dev.appspot.com",
  messagingSenderId: "347953604864",
  appId: "1:347953604864:web:34c64205053c26acf62be5",
};

const firebaseConfigMap = {
  development: devFirebaseConfig,
  test: devFirebaseConfig,
  production: prodFirebaseConfig,
};

const environment = process.env.NODE_ENV || "development";

export const firebaseConfig =
  firebaseConfigMap[environment] || devFirebaseConfig;
