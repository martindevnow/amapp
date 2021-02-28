import styled from "styled-components";
import React, { FormEvent, useState } from "react";
import Button from "../ui/button.component";
import Input from "../ui/input.component";
import useAuth from "../../hooks/useAuth.hook";
import { LGHeader } from "../ui/header.component";
import { IUserProfile } from "../../services/auth/auth.types";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const EditProfileForm: React.FC<{ user: IUserProfile }> = ({ user }) => {
  const { authService } = useAuth();

  let imageInput = React.createRef<HTMLInputElement>();

  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ""
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authService.updateUser(user.uid, { displayName });
    if (imageInput.current?.files?.[0]) {
      const file = imageInput.current?.files?.[0];
      await authService.saveUserProfilePic(user.uid, file);
    }
  };

  return (
    <section>
      <LGHeader>Edit your Profile</LGHeader>

      <Form onSubmit={onSubmit}>
        <label>
          <Input
            type="text"
            name="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
          />
        </label>
        <label>
          <Input type="file" ref={imageInput} />
        </label>
        <Button type="submit">Update</Button>
      </Form>
    </section>
  );
};

export default EditProfileForm;
