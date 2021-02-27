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

import theme from "./styles/theme";
import { GlobalStyle } from "./styles/global";
import ProtectedRoute from "./hoc/protected-route.component";
import { AclActions } from "./services/auth/auth.acl";
import {
  LGHeader,
  MDHeader,
  SMHeader,
} from "./components/ui/header/header.component";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navigation />
        <Layout>
          <Main>
            {/* <LGHeader>AMApp</LGHeader>
            <MDHeader>AMApp</MDHeader>
            <SMHeader>AMApp</SMHeader> */}
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
      </ThemeProvider>
    </Router>
  );
}

export default App;
