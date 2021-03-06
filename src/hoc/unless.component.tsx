import React from "react";
import useAuth from "../hooks/useAuth.hook";
import { AclActions } from "../services/auth/auth.acl";

interface UnlessProps {
  aclAction: AclActions;
}
const Unless: React.FC<UnlessProps> = ({ aclAction, children }) => {
  const { authService } = useAuth();
  const canDo = authService.canUserDo(aclAction);
  return canDo ? null : <>{children}</>;
};

export default Unless;
