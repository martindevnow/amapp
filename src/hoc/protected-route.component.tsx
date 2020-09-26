import React, { FunctionComponent } from "react";
import { Route } from "react-router-dom";
import { AclRoles } from "../services/auth/auth.acl";

interface ProtectedRouteProps {
  allowedRoles: AclRoles[];
  component: any; // TODO: Find the right Type here
}
const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  allowedRoles,
  component: Component,
}) => {
  return <Route />;
};

export default ProtectedRoute;
