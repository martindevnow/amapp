import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

import Input from "../ui/input.component";
import Button from "../ui/button.component";
import useAuth from "../../hooks/useAuth.hook";
import Card from "../ui/card.component";
import { MDHeader } from "../ui/header.component";
import InlineError from "../ui/errors/inline-error.component";
import { Label } from "../ui/label.component";

const SignInEmailForm = () => {
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
    <Card>
      <MDHeader>Email and Password</MDHeader>
      <form onSubmit={onSubmit}>
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email Address"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <InlineError show={!!error?.message}>{error?.message}</InlineError>

        <Button disabled={isInvalid} type="submit">
          Sign In
        </Button>
      </form>
    </Card>
  );
};

export default SignInEmailForm;
