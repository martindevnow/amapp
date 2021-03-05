import React from "react";
import useAuth from "../../hooks/useAuth.hook";

import EditProfileForm from "../forms/edit-profile.form";
import { LGHeader } from "../ui/header.component";
import UserProfile from "../user-profile.component";

const HomePage = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div>
      <LGHeader>Your Profile</LGHeader>

      <UserProfile user={user} />
      <EditProfileForm user={user} />
    </div>
  );
};

export default HomePage;
