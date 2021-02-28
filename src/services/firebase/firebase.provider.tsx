import React from "react";

import FirebaseContext from "./firebase.context";
import firebaseService from "./firebase.service";

const FirebaseProvider: React.FC = ({ children }) => {
  return (
    <FirebaseContext.Provider value={firebaseService}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
