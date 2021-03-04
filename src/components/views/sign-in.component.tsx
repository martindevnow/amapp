import React from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { firebaseConfig } from "../../services/firebase/firebase.config";

import SignInWithMicrosoft from "../forms/sign-in-microsoft.form";
import SignInEmailForm from "../forms/sign-in-email.form";
import useAuth from "../../hooks/useAuth.hook";
import Column from "../layout/column.component";
import { LGHeader } from "../ui/header.component";
import Card from "../ui/card.component";

const Flex = styled.div`
  display: flex;
  gap: 2rem;
  ${Card} {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const SignInPage = () => {
  const { user, loaded } = useAuth();
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
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
      <LGHeader style={{ textAlign: "left" }}>Sign In</LGHeader>
      <Flex>
        {firebaseConfig.projectId === "tw-amapp-dev" && (
          <Column>
            <SignInEmailForm />
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
