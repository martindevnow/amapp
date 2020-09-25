import React, { FunctionComponent } from "react";
import FirebaseContext from "./firebase.context";
import firebase from "../../services/firebase/firebase.class";

const FirebaseProvider: FunctionComponent = (props) => {
  return (
    <FirebaseContext.Provider value={firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
