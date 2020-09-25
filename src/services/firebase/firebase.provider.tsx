import React, { FunctionComponent } from "react";
import FirebaseContext from "./firebase.context";
import firebase from "./firebase.service";

const FirebaseProvider: FunctionComponent = (props) => {
  return (
    <FirebaseContext.Provider value={firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
