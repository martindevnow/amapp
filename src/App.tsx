import React, { useContext } from "react";
import * as ROUTES from "./constants/routes";

import "./App.scss";
import FirebaseContext from "./services/firebase/firebase.context";

import { useAuthState } from "react-firebase-hooks/auth";
import Navigation from "./components/navigation/navigation.component";
import { Route, BrowserRouter as Router } from "react-router-dom";
import SignUpPage from "./components/sign-up/sign-up.component";
import SignInPage from "./components/sign-in/sign-in.component";
import LandingPage from "./components/landing/landing.component";
import HomePage from "./components/home/home.component";
import RoomPage from "./components/room/room.component";
import LobbyPage from "./components/lobby/lobby.component";

function App() {
  const fb = useContext(FirebaseContext);

  const [user] = useAuthState(fb.auth);
  return (
    <Router>
      <div>
        <Navigation authUser={user} />
        <main className="app-main">
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.LOBBY} component={LobbyPage} />
          <Route path={ROUTES.ROOM} component={RoomPage} />
          {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
          {/* <Route path={ROUTES.ACCOUNT} component={AccountPage} /> */}
          {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
        </main>
      </div>
    </Router>
  );
}

export default App;
