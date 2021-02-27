import React, { FunctionComponent } from "react";
import useAuth from "../hooks/useAuth.hook";
import { AclActions } from "../services/auth/auth.acl";

interface CanProps {
  aclAction: AclActions;
  disabled?: boolean;
}
const Can: FunctionComponent<CanProps> = ({
  aclAction,
  children,
  disabled,
}) => {
  const { authService } = useAuth();
  const canDo = authService.canUserDo(aclAction);
  return canDo && !disabled ? <>{children}</> : null;
};

export default Can;
