/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useContext, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { SignUpLink } from "../sign-up/sign-up.component";
import * as ROUTES from "../../constants/routes";
import AuthContext from "../../services/auth/auth.context";
import Button from "../ui/button/button.component";
import Input from "../ui/input/input.component";

export const SignInWithMicrosoft = () => {
  const { authService } = useContext(AuthContext);
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
        history.push(ROUTES.HOME);
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

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <div
      css={css`
        display: flex;
        justify-content: space-around;
      `}
    >
      <SignInForm />
      <SignInWithMicrosoft />
    </div>
    {/* <SignUpLink /> */}
  </div>
);

export default SignInPage;
