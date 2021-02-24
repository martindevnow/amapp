import React, { FunctionComponent } from "react";
import useAuth from "../hooks/useAuth.hook";
import { AclActions } from "../services/auth/auth.acl";

interface CanProps {
  aclAction: AclActions;
}
const Can: FunctionComponent<CanProps> = ({ aclAction, children }) => {
  const { authService } = useAuth();
  const canDo = authService.canUserDo(aclAction);
  return canDo ? <>{children}</> : null;
};

export default Can;
