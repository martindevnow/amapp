import React from "react";
import firebaseService, { FirebaseService } from "./firebase.service";

const FirebaseContext = React.createContext<FirebaseService>(firebaseService);

export default FirebaseContext;
