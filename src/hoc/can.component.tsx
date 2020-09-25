import React, { FunctionComponent, useContext } from "react";
import { AclActions } from "../services/auth/auth.acl";
import AuthContext from "../services/auth/auth.context";

interface CanProps {
  aclAction: AclActions;
}
const Can: FunctionComponent<CanProps> = ({ aclAction, children }) => {
  const { authService, user } = useContext(AuthContext);
  const canDo = authService.canUserDo(user, aclAction);
  return canDo ? <>{children}</> : null;
};

export default Can;
