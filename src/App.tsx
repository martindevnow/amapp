/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Route, BrowserRouter as Router } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import Navigation from "./components/navigation/navigation.component";
import SignUpPage from "./components/sign-up/sign-up.component";
import SignInPage from "./components/sign-in/sign-in.component";
import LandingPage from "./components/landing/landing.component";
import HomePage from "./components/home/home.component";
import RoomPage from "./components/room/room.component";
import LobbyPage from "./components/lobby/lobby.component";

import ProtectedRoute from "./hoc/protected-route.component";
import { AclActions } from "./services/auth/auth.acl";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <main
          css={css`
            padding: 0 1rem 1rem;
            @media (min-width: 420px) {
              padding: 0 2rem 2rem;
            }
          `}
        >
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <ProtectedRoute
            action={AclActions.VISIT_HOME}
            path={ROUTES.HOME}
            component={HomePage}
          />
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
