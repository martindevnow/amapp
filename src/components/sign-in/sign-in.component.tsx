import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { firebaseConfig } from "../../services/firebase/firebase.config";

import SignInWithMicrosoft from "./sign-in-microsoft.component";
import SignInForm from "./sign-in-form.component";
import useAuth from "../../hooks/useAuth.hook";
import Column from "../ui/layout/column.component";

const Flex = styled.div`
  display: flex;
  gap: 2rem;
`;

const SignInPage = () => {
  const { user, loaded } = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (loaded && user) {
      if ((location.state as any)?.prevPage?.pathname) {
        history.push((location.state as any).prevPage.pathname);
      } else {
        history.push(ROUTES.HOME);
      }
    }
  }, [loaded, user, history, location]);

  return (
    <>
      <h1>Sign In</h1>
      <Flex>
        {firebaseConfig.projectId === "tw-amapp-dev" && (
          <Column>
            <SignInForm />
          </Column>
        )}
        <Column>
          <SignInWithMicrosoft />
        </Column>
      </Flex>
    </>
  );
};

export default SignInPage;
