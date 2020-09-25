import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import "./join-room.styles.scss";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const history = useHistory();
  const onSubmit = (e: any) => {
    e.preventDefault();
    history.push(ROUTES.ROOM_BY_ID(roomId));
  };
  return (
    <form onSubmit={(e) => onSubmit(e)} className="join-room-form">
      <input
        type="text"
        name="roomId"
        value={roomId}
        placeholder="Room ID"
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button>Join Room</button>
    </form>
  );
};

export default JoinRoom;
