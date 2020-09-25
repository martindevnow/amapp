import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import SignOutButton from "../sign-out/sign-out.component";
import "./navigation.styles.scss";

const Navigation = ({ authUser }: { authUser: any }) => (
  <nav className="navigation">
    <Link to="/" className="app-logo-link">
      AMApp
    </Link>
    {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
  </nav>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.LOBBY}>Lobby</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
