import React from "react";
import AuthContext from "../services/auth/auth.context";

const useAuth = () => {
  const authContext = React.useContext(AuthContext);
  return authContext;
};

export default useAuth;
