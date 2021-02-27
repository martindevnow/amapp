import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { ButtonDark } from "../ui/button/button.component";
import InlineError from "../ui/error/inline-error.component";
import Input from "../ui/input/input.component";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomId) {
      setError("Please enter a room ID");
      return;
    }
    history.push(ROUTES.ROOM_BY_ID(roomId));
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Input
        type="text"
        name="roomId"
        value={roomId}
        placeholder="Room ID"
        onChange={(e) => {
          setError("");
          setRoomId(e.target.value);
        }}
        bleed
      />
      <InlineError show={!!error}>{error}</InlineError>
      <ButtonDark>Join Room</ButtonDark>
    </form>
  );
};

export default JoinRoom;
