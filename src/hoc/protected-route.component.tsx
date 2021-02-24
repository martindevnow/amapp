import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useAuth from "../hooks/useAuth.hook";
import { AclActions } from "../services/auth/auth.acl";

interface ProtectedRouteProps extends RouteProps {
  action: AclActions;
  component: any; // TODO: Find the right Type here
}
const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  action,
  component: Component,
  // TODO: Use this with the ACL as the key to see if a user can visit this "Path"
  path,
  ...rest
}) => {
  const { authService } = useAuth();
  return (
    <Route
      {...rest}
      path={path}
      render={(props) =>
        authService.canUserDo(action) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
