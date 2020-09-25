import React, { useState, useContext } from "react";
import { IRoomRecord } from "../../services/rooms/rooms.types";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {
  RoomsContext,
  RoomsService,
} from "../../services/rooms/rooms.provider";
import Button from "../ui/button/button.component";
import Input from "../ui/input/input.component";

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
    console.log({ newRoomId });

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
      />

      <Button type="submit">Create</Button>
    </form>
  );
};

const CreateRoom = () => {
  return <CreateRoomForm />;
};

export default CreateRoom;
