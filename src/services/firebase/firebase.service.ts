import app from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";
// import Logger from "../../utils/Logger";

import { firebaseConfig } from "./firebase.config";

export class FirebaseService {
  public auth: firebase.auth.Auth;
  public db: firebase.firestore.Firestore;
  public storage: firebase.storage.Storage;
  public analytics: firebase.analytics.Analytics;

  constructor() {
    // Logger.log("Firebase Service :: Constructor");
    // Show environment, even in production
    console.log(`Loading Firebase Project :: ${firebaseConfig.projectId}`);
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
    this.analytics = app.analytics();
  }

  increment = app.firestore.FieldValue.increment(1);
  decrement = app.firestore.FieldValue.increment(-1);
}

const firebaseService = new FirebaseService();
export default firebaseService;
