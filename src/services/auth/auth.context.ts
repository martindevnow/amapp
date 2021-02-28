import React from "react";
import { GuestRoleMap } from "./auth.acl";

import authService, { AuthService } from "./auth.service";
import { IUserProfile, IUserRoles } from "./auth.types";

const INITIAL = {
  authService: authService,
  user: null,
  loaded: false,
  roles: GuestRoleMap,
};

const AuthContext = React.createContext<{
  authService: AuthService;
  user: null | IUserProfile;
  loaded: boolean;
  roles: IUserRoles;
}>(INITIAL);

export default AuthContext;
