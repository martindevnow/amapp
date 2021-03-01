import React from "react";
import { RoomsContext } from "../services/rooms/rooms.provider";
import { IRoom } from "../services/rooms/rooms.types";

const useRoom = (roomId: string) => {
  const { roomsService } = React.useContext(RoomsContext);
  const [room, setRoom] = React.useState<IRoom | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  const updateState = (room: IRoom) => {
    setLoaded(true);
    setRoom(room);
  };

  React.useEffect(() => {
    return roomsService.readWatcher(roomId, updateState);
  }, [roomId, roomsService]);

  return { room, loaded };
};

export default useRoom;
