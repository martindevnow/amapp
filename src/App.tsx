import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import Layout from "./components/layout/layout.component";
import Main from "./components/layout/main.component";
import Navigation from "./components/layout/navigation.component";

import SignUpPage from "./components/views/sign-up.component";
import SignInPage from "./components/views/sign-in.component";
import LandingPage from "./components/views/landing.component";
import HomePage from "./components/views/home.component";
import RoomPage from "./components/views/room.component";
import LobbyPage from "./components/views/lobby.component";

import ProtectedRoute from "./hoc/protected-route.component";
import { AclActions } from "./services/auth/auth.acl";
import useAuth from "./hooks/useAuth.hook";

// TODO: Consider absolute imports
// https://create-react-app.dev/docs/importing-a-component/#absolute-imports

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navigation user={user} />
      <Layout>
        <Main>
          <Route component={LandingPage} exact path={ROUTES.LANDING} />
          <Route component={SignUpPage} path={ROUTES.SIGN_UP} />
          <Route component={SignInPage} path={ROUTES.SIGN_IN} />
          <ProtectedRoute
            action={AclActions.VISIT_HOME}
            component={HomePage}
            path={ROUTES.HOME}
          />
          <Route component={LobbyPage} exact path={ROUTES.LOBBY} />
          <Route component={RoomPage} path={ROUTES.ROOM} />
          {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
          {/* <Route path={ROUTES.ACCOUNT} component={AccountPage} /> */}
          {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
        </Main>
      </Layout>
    </Router>
  );
}

export default App;
