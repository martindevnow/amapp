/* eslint-disable @typescript-eslint/no-unused-vars */

interface ConfigMap {
  development: any;
  test: any;
  production: any;
}

type Environment = keyof ConfigMap;

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       DEPLOY_ENVIRONMENT: Environment;
//       FIREBASE_API_KEY: string;
//       FIREBASE_AUTH_DOMAIN: string;
//       FIREBASE_DATABASE_URL: string;
//       FIREBASE_PROJECT_ID: string;
//       FIREBASE_STORAGE_BUCKET: string;
//       FIREBASE_MESSAGING_SENDER_ID: string;
//       FIREBASE_APP_ID: string;
//       FIREBASE_MEASUREMENT_ID: string;
//     }
//   }
// }

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

const firebaseConfigMap: ConfigMap = {
  development: devFirebaseConfig,
  test: devFirebaseConfig,
  production: prodFirebaseConfig,
};

interface EnvironmentMap {
  "localhost:3000": Environment;
  "tw-amapp.web.app": Environment;
  "tw-amapp-dev.web.app": Environment;
}

const hostEnvironmentMap: any = {
  "localhost:3000": "development",
  "tw-amapp-dev.web.app": "development",
  "tw-amapp.web.app": "production",
};

const host: any = window.location.host;
const environment: Environment = hostEnvironmentMap[host] || "development";

export const firebaseConfig =
  firebaseConfigMap[environment] || devFirebaseConfig;
