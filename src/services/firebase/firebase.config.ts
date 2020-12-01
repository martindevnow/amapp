/* eslint-disable @typescript-eslint/no-unused-vars */

interface ConfigMap {
  development: any;
  test: any;
  production: any;
}

type Environment = keyof ConfigMap;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEPLOY_ENVIRONMENT: Environment;
      FIREBASE_API_KEY: string;
      FIREBASE_AUTH_DOMAIN: string;
      FIREBASE_DATABASE_URL: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_STORAGE_BUCKET: string;
      FIREBASE_MESSAGING_SENDER_ID: string;
      FIREBASE_APP_ID: string;
      FIREBASE_MEASUREMENT_ID: string;
    }
  }
}

const prodFirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
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

const environment = process.env.DEPLOY_ENVIRONMENT || "development";

export const firebaseConfig =
  firebaseConfigMap[environment] || devFirebaseConfig;
