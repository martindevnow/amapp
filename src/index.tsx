import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import RoomsProvider from "./services/rooms/rooms.provider";

import "./index.css";
import GlobalStyle from "./styles/global";
import themes from "./styles/themes";
import AuthProvider from "./services/auth/auth.provider";
import ThemeProvider from "./services/theme/theme.provider";

const fontWeights = Object.values(themes.light.fontWeight).join(";");

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
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyle />
        <RoomsProvider>
          <App />
        </RoomsProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
