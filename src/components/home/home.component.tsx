import React from "react";
import useAuth from "../../hooks/useAuth.hook";

import EditProfile from "../edit-profile/edit-profile.component";
import { LGHeader } from "../ui/header/header.component";
import UserProfile from "../user-profile/user-profile.component";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <LGHeader>Your Profile</LGHeader>
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
