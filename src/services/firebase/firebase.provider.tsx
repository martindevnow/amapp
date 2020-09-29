import React, { FunctionComponent } from "react";

import FirebaseContext from "./firebase.context";
import firebaseService from "./firebase.service";

const FirebaseProvider: FunctionComponent = (props) => {
  return (
    <FirebaseContext.Provider value={firebaseService}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
