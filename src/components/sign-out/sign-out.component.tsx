import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import AuthContext from "../../services/auth/auth.context";
import { ButtonLight } from "../ui/button/button.component";

const SignOutButton = () => {
  const { authService } = useContext(AuthContext);
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
