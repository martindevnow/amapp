import React from "react";
import authService, { AuthService, IUserProfile } from "./auth-service.class";

const INITIAL = {
  authService: authService,
  user: null,
  loaded: false,
};

const AuthContext = React.createContext<{
  authService: AuthService;
  user: null | IUserProfile;
  loaded: boolean;
}>(INITIAL);

export default AuthContext;
