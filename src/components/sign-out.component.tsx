import React from "react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../constants/routes";
import useAuth from "../hooks/useAuth.hook";
import { ButtonLight } from "./ui/button.component";

const SignOutButton = () => {
  const { authService } = useAuth();
  const history = useHistory();

  const signOut = () => {
    authService.doSignOut().then(() => {
      history.push(ROUTES.LANDING);
    });
  };
  return (
    <ButtonLight type="button" onClick={signOut}>
      Sign Out
    </ButtonLight>
  );
};

export default SignOutButton;
