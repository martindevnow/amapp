import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Button from "../ui/button/button.component";
import Input from "../ui/input/input.component";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const history = useHistory();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(ROUTES.ROOM_BY_ID(roomId));
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Input
        type="text"
        name="roomId"
        value={roomId}
        placeholder="Room ID"
        onChange={(e) => setRoomId(e.target.value)}
      />
      <Button>Join Room</Button>
    </form>
  );
};

export default JoinRoom;
