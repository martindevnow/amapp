import React from "react";

import FirebaseContext from "../services/firebase/firebase.context";

const useFirebase = () => {
  const firebaseService = React.useContext(FirebaseContext);
  return firebaseService;
};

export default useFirebase;
