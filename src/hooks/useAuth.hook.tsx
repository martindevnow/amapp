import React from "react";
import AuthContext from "../services/auth/auth.context";

export default function useAuth() {
  return React.useContext(AuthContext);
}
