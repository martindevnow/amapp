import React, { FunctionComponent, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AclActions } from "../services/auth/auth.acl";
import AuthContext from "../services/auth/auth.context";

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
  const { authService } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      path={path}
      render={(props) => {
        if (authService.canUserDo(action)) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
