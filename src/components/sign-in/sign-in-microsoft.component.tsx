import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { css } from "styled-components";

import * as ROUTES from "../../constants/routes";
import useAuth from "../../hooks/useAuth.hook";
import Button from "../ui/button/button.component";

const SignInWithMicrosoft = () => {
  const { authService } = useAuth();
  const location = useLocation();
  const history = useHistory();
  const [error, setError] = useState<any>(null);

  const onClick = () => {
    authService
      .doSignInWithMicrosoft()
      .then((credential) => {
        authService.createUserProfileDocument(
          credential.user as firebase.User,
          { displayName: credential.user?.displayName || "" }
        );
        if ((location.state as any)?.prevPage?.pathname) {
          history.push((location.state as any).prevPage.pathname);
        } else {
          history.push(ROUTES.HOME);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <Button onClick={onClick}>Sign In With Microsoft</Button>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default SignInWithMicrosoft;
