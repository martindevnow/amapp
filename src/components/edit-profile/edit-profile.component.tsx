import styled from "styled-components";
import React, { FormEvent, useContext, useState } from "react";
import AuthContext from "../../services/auth/auth.context";
import Button from "../ui/button/button.component";
import Input from "../ui/input/input.component";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const EditProfile = () => {
  const { user, authService } = useContext(AuthContext);

  let imageInput = React.createRef<HTMLInputElement>();

  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ""
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      return;
    }
    authService.updateUser(user.uid, { displayName });
    if (imageInput.current?.files?.[0]) {
      const file = imageInput.current?.files?.[0];
      await authService.saveUserProfilePic(user.uid, file);
    }
  };

  return (
    <section>
      <h2>Edit your Profile</h2>

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

export default EditProfile;
