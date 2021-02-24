import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { css } from "styled-components";

import * as ROUTES from "../../constants/routes";

import Input from "../ui/input/input.component";
import Button from "../ui/button/button.component";
import useAuth from "../../hooks/useAuth.hook";

const SignInForm = () => {
  const { authService } = useAuth();

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

export default SignInForm;
