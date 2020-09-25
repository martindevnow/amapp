import React from "react";
import CreateRoom from "../create-room/create-room.component";
import JoinRoom from "../join-room/join-room.component";

const LobbyPage = () => {
  return (
    <div>
      <h2>Create a New Room</h2>
      <CreateRoom />
      <h2>Join an Open Room</h2>
      <JoinRoom />
    </div>
  );
};

export default LobbyPage;
