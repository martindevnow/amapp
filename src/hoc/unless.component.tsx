import React, { FunctionComponent, useContext } from "react";
import { AclActions } from "../services/auth/auth.acl";
import AuthContext from "../services/auth/auth.context";

interface UnlessProps {
  aclAction: AclActions;
}
const Unless: FunctionComponent<UnlessProps> = ({ aclAction, children }) => {
  const { authService } = useContext(AuthContext);
  const canDo = authService.canUserDo(aclAction);
  return canDo ? null : <>{children}</>;
};

export default Unless;
