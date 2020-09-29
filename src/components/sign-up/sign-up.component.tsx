/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { FormEvent, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import AuthContext from "../../services/auth/auth.context";
import Button from "../ui/button/button.component";
import Input from "../ui/input/input.component";

export const SignUpForm = () => {
  const { authService } = useContext(AuthContext);
  const history = useHistory();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState<any>(null);

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    displayName === "";

  const clearState = () => {
    setDisplayName("");
    setEmail("");
    setPasswordOne("");
    setPasswordTwo("");
    setError(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authService
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((credential) => {
        authService.createUserProfileDocument(
          credential.user as firebase.User,
          { displayName }
        );
        clearState();
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <label
        htmlFor="displayName"
        css={css`
          display: block;
          margin-top: 1rem;
          margin-bottom: 0.2rem;
        `}
      >
        Display Name
      </label>
      <Input
        name="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        type="text"
        placeholder="Display Name"
      />
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
        htmlFor="passwordOne"
        css={css`
          display: block;
          margin-top: 1rem;
          margin-bottom: 0.2rem;
        `}
      >
        Password
      </label>
      <Input
        name="passwordOne"
        value={passwordOne}
        onChange={(e) => setPasswordOne(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <label
        htmlFor="passwordTwo"
        css={css`
          display: block;
          margin-top: 1rem;
          margin-bottom: 0.2rem;
        `}
      >
        Confirm Password
      </label>
      <Input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <Button
        disabled={isInvalid}
        type="submit"
        css={css`
          display: block;
          margin-top: 1rem;
        `}
      >
        Sign Up
      </Button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

export default SignUpPage;
