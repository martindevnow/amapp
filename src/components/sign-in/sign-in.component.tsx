import React, { useEffect, useState, useContext, FormEvent } from "react";
import { css } from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import AuthContext from "../../services/auth/auth.context";
import Button from "../ui/button/button.component";
import Input from "../ui/input/input.component";
import { firebaseConfig } from "../../services/firebase/firebase.config";
import { useAuth } from "../../services/auth/auth.provider";

const SignInWithMicrosoft = () => {
  const { authService } = useContext(AuthContext);
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

export const SignInForm = () => {
  const { authService } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>(null);

  const history = useHistory();

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setError(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    authService
      .doSignInWithEmailAndPassword(email, password)
      .then((_) => {
        clearForm();
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error);
      });

    event.preventDefault();
  };

  const isInvalid = password === "" || email === "";

  return (
    <form onSubmit={onSubmit}>
      <label
        htmlFor="email"
        css={css`
          display: block;
          margin-top: 1rem;
          margin-bottom: 0.2rem;
        `}
      >
        Email
      </label>
      <Input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <label
        htmlFor="password"
        css={css`
          display: block;
          margin-top: 1rem;
          margin-bottom: 0.2rem;
        `}
      >
        Password
      </label>
      <Input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <Button
        css={css`
          margin-top: 1rem;
          display: block;
        `}
        disabled={isInvalid}
        type="submit"
      >
        Sign In
      </Button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

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
    <div>
      <h1>Sign In</h1>
      <div
        css={css`
          display: flex;
          justify-content: space-around;
        `}
      >
        {firebaseConfig.projectId === "tw-amapp-dev" && <SignInForm />}
        <SignInWithMicrosoft />
      </div>
    </div>
  );
};

export default SignInPage;
