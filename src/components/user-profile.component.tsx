import React from "react";
import styled from "styled-components";
import { IUserProfile } from "../services/auth/auth.types";
import { MDHeader } from "./ui/header.component";

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

type UserProfileProps = { user: IUserProfile };

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <ProfileCard>
      <ProfileImageContainer>
        <ProfileImage src={user.photoURL} />
      </ProfileImageContainer>
      <ProfileBodyContainer>
        <MDHeader>{user.displayName}</MDHeader>
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
  );
};

export default UserProfile;
