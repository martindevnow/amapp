/** @jsx jsx */
import React, { useContext } from "react";
import { css, jsx } from "@emotion/core";

import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import AuthContext from "../../services/auth/auth.context";
import SignOutButton from "../sign-out/sign-out.component";

import "./navigation.styles.scss";
import styled from "@emotion/styled";

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: #eeeeee;
`;

const NavigationList = styled.ul`
  display: flex;
  flex-direction: row;

  & li {
    list-style: none;
    padding: 0 0.5rem;
    text-align: center;
    display: flex;
    justify-content: center;
    & > a {
      text-decoration: none;

      &:hover {
        color: darken(darkblue, 50%);
        transform: translateY(-2px);
      }
    }
  }
`;

const NavigationItem = styled.li`
  display: flex;
  align-items: center;
`;

const Navigation = () => {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Link
        to="/"
        css={css`
          padding: 1rem;
          font-weight: 800;
          text-decoration: none;
          font-size: 1.6rem;
        `}
      >
        AMApp
      </Link>
      <NavigationList>
        {user ? <NavigationAuth /> : <NavigationNonAuth />}
      </NavigationList>
    </NavigationContainer>
  );
};

const NavigationAuth = () => (
  <React.Fragment>
    <NavigationItem>
      <Link to={ROUTES.HOME}>Home</Link>
    </NavigationItem>
    <NavigationItem>
      <Link to={ROUTES.LOBBY}>Lobby</Link>
    </NavigationItem>
    <NavigationItem>
      <SignOutButton />
    </NavigationItem>
  </React.Fragment>
);

const NavigationNonAuth = () => (
  <NavigationItem>
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </NavigationItem>
);

export default Navigation;
