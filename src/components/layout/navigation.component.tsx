import React from "react";

import * as ROUTES from "../../constants/routes";
import NavigationContainer from "../ui/navigation/navigation-container.component";
import NavigationItem from "../ui/navigation/navigation-item.component";
import NavigationList from "../ui/navigation/navigation-list.component";
import NavigationBar from "../ui/navigation/navigation-bar.component";
import Logo from "../ui/logo.component";

import SignOutButton from "../sign-out.component";
import { IUserProfile } from "../../services/auth/auth.types";
import Link from "../ui/link.component";

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

type NavigationProps = {
  user: null | IUserProfile;
};

const Navigation: React.FC<NavigationProps> = ({ user }) => {
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
