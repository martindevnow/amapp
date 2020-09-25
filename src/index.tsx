import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import FirebaseProvider from "./services/firebase/firebase.provider";
import AuthUserProvider from "./services/auth/auth.provider";
import RoomsProvider from "./services/rooms/rooms.provider";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <AuthUserProvider>
        <RoomsProvider>
          <App />
        </RoomsProvider>
      </AuthUserProvider>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
