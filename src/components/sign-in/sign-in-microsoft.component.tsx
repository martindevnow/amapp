import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import * as ROUTES from "../../constants/routes";
import useAuth from "../../hooks/useAuth.hook";
import Button from "../ui/button/button.component";
import { default as UICard } from "../ui/card/card.component";
import InlineError from "../ui/error/inline-error.component";
import { MDHeader } from "../ui/header/header.component";

const Card = styled(UICard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

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
    <Card>
      <MDHeader>Microsoft Single Sign On</MDHeader>
      <Button onClick={onClick}>Sign In With Microsoft</Button>
      <InlineError show={!!error?.message}>{error?.message}</InlineError>
    </Card>
  );
};

export default SignInWithMicrosoft;
