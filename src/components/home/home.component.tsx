import React, { useContext } from "react";

import AuthContext from "../../services/auth/auth.context";

import EditProfile from "../edit-profile/edit-profile.component";
import UserProfile from "../user-profile/user-profile.component";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Your Profile</h1>
      {user && (
        <>
          <UserProfile />
          <EditProfile />
        </>
      )}
    </div>
  );
};

export default HomePage;
