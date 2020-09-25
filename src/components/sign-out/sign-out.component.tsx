import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import AuthContext from "../../services/auth/auth.context";

const SignOutButton = () => {
  const { authService } = useContext(AuthContext);
  const history = useHistory();

  const signOut = () => {
    authService.doSignOut().then(() => {
      history.push(ROUTES.LANDING);
    });
  };
  return (
    <button type="button" onClick={signOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
