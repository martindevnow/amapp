import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { firebaseConfig } from "./firebase.config";

export class FirebaseService {
  public auth: firebase.auth.Auth;
  public db: firebase.firestore.Firestore;
  public storage: firebase.storage.Storage;

  constructor() {
    // console.log("Firebase Service :: Constructor");
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  increment = app.firestore.FieldValue.increment(1);
  decrement = app.firestore.FieldValue.increment(-1);
}

const firebaseService = new FirebaseService();
export default firebaseService;
