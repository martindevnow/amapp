import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { IRoomRecord } from "../../services/rooms/rooms.types";
import {
  RoomsContext,
  RoomsService,
} from "../../services/rooms/rooms.provider";
import Button from "../ui/button.component";
import Input from "../ui/input.component";

const CreateRoomForm = () => {
  const [name, setName] = useState("");

  const { roomsService } = useContext(RoomsContext);
  const history = useHistory();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const room: IRoomRecord = {
      name,
    };
    // TODO: Handle Possible Errors here?
    const newRoomId = await (roomsService as RoomsService).createRoom(room);
    history.push(ROUTES.ROOM_BY_ID(newRoomId));
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        name="title"
        value={name}
        placeholder="The room's name"
        onChange={(e) => setName(e.target.value)}
        bleed
      />
      <Button type="submit">Create</Button>
    </form>
  );
};

export default CreateRoomForm;
