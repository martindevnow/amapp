import React, { useContext } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";
import { RoomsContext } from "../../services/rooms/rooms.provider";
import CreateRoom from "../create-room/create-room.component";
import JoinRoom from "../join-room/join-room.component";

const LobbyPage = () => {
  const { rooms } = useContext(RoomsContext);

  return (
    <div>
      <Can aclAction={AclActions.LIST_ROOMS}>
        <h2>Active Rooms</h2>
        {rooms &&
          Object.values(rooms).map((room) => (
            <Link key={room.id} to={ROUTES.ROOM_BY_ID(room.id)}>
              {room.name}
            </Link>
          ))}
      </Can>
      <Can aclAction={AclActions.CREATE_ROOM}>
        <h2>Create a New Room</h2>
        <CreateRoom />
      </Can>

      <h2>Join an Open Room</h2>
      <JoinRoom />
    </div>
  );
};

export default LobbyPage;
