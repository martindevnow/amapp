import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig } from "./firebase.config";

export class FirebaseService {
  public auth: firebase.auth.Auth;
  public db: firebase.firestore.Firestore;

  constructor() {
    console.log("Firebase Service :: Constructor");
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  increment = app.firestore.FieldValue.increment(1);
  decrement = app.firestore.FieldValue.increment(-1);
}

const firebase = new FirebaseService();
export default firebase;
