import React from "react";
import firebase, { FirebaseService } from "./firebase.service";

const FirebaseContext = React.createContext<FirebaseService>(firebase);

export default FirebaseContext;
