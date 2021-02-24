import React, { FunctionComponent } from "react";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth.hook";

const ProfileCard = styled.div`
  display: flex;
  border: 1px solid lightgray;
`;

const ProfileImageContainer = styled.div`
  padding: 1rem;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
`;

const ProfileBodyContainer = styled.div`
  padding: 1rem;
`;

const UserProfile: FunctionComponent = () => {
  const { user } = useAuth();

  return (
    user && (
      <ProfileCard>
        <ProfileImageContainer>
          <ProfileImage src={user.photoURL} />
        </ProfileImageContainer>
        <ProfileBodyContainer>
          <h2>{user.displayName}</h2>
          <p>
            <strong>Email: </strong>
            {user.email}
          </p>
          <p>
            <strong>Member Since: </strong>
            {(user.createdAt as Date).toDateString()}
          </p>
        </ProfileBodyContainer>
      </ProfileCard>
    )
  );
};

export default UserProfile;
