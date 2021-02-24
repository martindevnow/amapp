import React from "react";
import { ThemeProvider } from "styled-components";
import { Route, BrowserRouter as Router } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import Layout from "./components/ui/layout/layout";
import Navigation from "./components/navigation/navigation.component";
import SignUpPage from "./components/sign-up/sign-up.component";
import SignInPage from "./components/sign-in/sign-in.component";
import LandingPage from "./components/landing/landing.component";
import HomePage from "./components/home/home.component";
import RoomPage from "./components/room/room.component";
import LobbyPage from "./components/lobby/lobby.component";
import Main from "./components/ui/main/main.component";

import ProtectedRoute from "./hoc/protected-route.component";
import { AclActions } from "./services/auth/auth.acl";
import theme from "./styles/theme";
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navigation />
        <Layout>
          <Main>
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
          </Main>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
