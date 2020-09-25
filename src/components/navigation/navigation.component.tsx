import React, { useContext } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import AuthContext from "../../services/auth/auth.context";
import SignOutButton from "../sign-out/sign-out.component";
import "./navigation.styles.scss";

const Navigation = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav className="navigation">
      <Link to="/" className="app-logo-link">
        AMApp
      </Link>
      {user ? <NavigationAuth /> : <NavigationNonAuth />}
    </nav>
  );
};

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
