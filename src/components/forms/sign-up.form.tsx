import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Button from "../ui/button.component";
import Input from "../ui/input.component";
import useAuth from "../../hooks/useAuth.hook";
import { Label } from "../ui/label.component";
import InlineError from "../ui/errors/inline-error.component";
import Link from "../ui/link.component";

const SignUpForm = () => {
  const { authService } = useAuth();
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
      <Label htmlFor="displayName">Display Name</Label>
      <Input
        name="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        type="text"
        placeholder="Display Name"
      />

      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />

      <Label htmlFor="passwordOne">Password</Label>
      <Input
        name="passwordOne"
        value={passwordOne}
        onChange={(e) => setPasswordOne(e.target.value)}
        type="password"
        placeholder="Password"
      />

      <Label htmlFor="passwordTwo">Confirm Password</Label>
      <Input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />

      <Button disabled={isInvalid} type="submit">
        Sign Up
      </Button>

      <InlineError show={!!error?.message}>{error?.message}</InlineError>
    </form>
  );
};

export default SignUpForm;

export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
