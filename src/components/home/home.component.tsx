import React, { useContext, FunctionComponent } from "react";
import { IUserProfile } from "../../services/auth/auth.types";
import AuthContext from "../../services/auth/auth.context";

interface ProfileProps {
  profile: IUserProfile;
}

const Profile: FunctionComponent<ProfileProps> = ({ profile }) => {
  return (
    <>
      <h2>{profile.email}</h2>
      <h3>{profile.displayName}</h3>
      <h3>{profile.photoURL}</h3>
      <h3>{profile.createdAt.toDateString()}</h3>
    </>
  );
};

const UserProfile: FunctionComponent = () => {
  const { user } = useContext(AuthContext);

  return user ? <Profile profile={user} /> : null;
};

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to your homepage.</p>
      {user && user.uid ? <UserProfile /> : null}
    </div>
  );
};

export default HomePage;
