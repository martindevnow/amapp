import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { IRoom, IRoomRecord } from "../../components/room/room.types";
import FirebaseContext from "../firebase/firebase.context";

export interface RoomMap {
  [key: string]: IRoom;
}

export interface RoomsService {
  createRoom: (room: IRoomRecord) => Promise<string>;
}

interface RoomsContextValue {
  roomsService: RoomsService;
  rooms: RoomMap;
}

const INITIAL_ROOMS_CONTEXT_VALUE = {
  rooms: {},
};

export const RoomsContext = React.createContext<Partial<RoomsContextValue>>(
  INITIAL_ROOMS_CONTEXT_VALUE
);

const RoomsProvider: FunctionComponent = (props) => {
  const firebase = useContext(FirebaseContext);
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    return firebase.db.collection("rooms").onSnapshot((qs) => {
      const rooms: RoomMap = qs.docs
        .map((doc) => ({
          id: doc.id,
          ...(doc.data() as IRoomRecord),
        }))
        .reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
      setRooms(rooms);
    });
  }, [firebase]);

  const createRoom = async (room: IRoomRecord) => {
    const newRoom = await firebase.db.collection("rooms").add(room);
    return newRoom.id;
  };

  return (
    <RoomsContext.Provider value={{ rooms, roomsService: { createRoom } }}>
      {props.children}
    </RoomsContext.Provider>
  );
};

export default RoomsProvider;
