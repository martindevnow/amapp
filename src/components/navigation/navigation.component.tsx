import React from "react";

import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import SignOutButton from "../sign-out/sign-out.component";
import NavigationContainer from "../ui/navigation/navigation-container.component";
import NavigationItem from "../ui/navigation/navigation-item.component";
import NavigationList from "../ui/navigation/navigation-list.component";
import NavigationBar from "../ui/navigation/navigation-bar.component";
import Logo from "../ui/logo/logo.component";
import useAuth from "../../hooks/useAuth.hook";

const NavigationAuth = () => (
  <>
    <NavigationItem>
      <Link to={ROUTES.LOBBY}>Lobby</Link>
    </NavigationItem>
    <NavigationItem>
      <SignOutButton />
    </NavigationItem>
  </>
);

const NavigationNonAuth = () => (
  <NavigationItem>
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </NavigationItem>
);

const Navigation = () => {
  const { user } = useAuth();
  return (
    <NavigationBar>
      <NavigationContainer>
        <Logo to="/">AMApp</Logo>
        <NavigationList>
          {user ? <NavigationAuth /> : <NavigationNonAuth />}
        </NavigationList>
      </NavigationContainer>
    </NavigationBar>
  );
};

export default Navigation;
