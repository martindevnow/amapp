import React from "react";
import useAuth from "../../hooks/useAuth.hook";

import EditProfile from "../edit-profile/edit-profile.component";
import UserProfile from "../user-profile/user-profile.component";

const HomePage = () => {
  const { user } = useAuth();

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
