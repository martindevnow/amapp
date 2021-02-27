import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import FirebaseProvider from "./services/firebase/firebase.provider";
import AuthUserProvider from "./services/auth/auth.provider";
import RoomsProvider from "./services/rooms/rooms.provider";

import "./index.css";
import theme from "./styles/theme";

const fontWeights = Object.values(theme.fontWeight).join(";");

WebFont.load({
  google: {
    families: [
      `Inconsolata:wght@${fontWeights}&display=swap`,
      // `Nunito :${Object.values(theme.fontWeight).join(",")}`,
      // "sans-serif",
    ],
  },
});

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
