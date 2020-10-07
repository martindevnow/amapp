import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";

import { RoomMap, IRoomRecord } from "./rooms.types";
import FirebaseContext from "../firebase/firebase.context";

export interface RoomsService {
  createRoom: (room: IRoomRecord) => Promise<string>;
}

interface RoomsContextValue {
  roomsService: RoomsService;
  rooms: RoomMap;
  loaded: boolean;
}

const INITIAL_ROOMS_CONTEXT_VALUE = {
  rooms: {},
  loaded: false,
};

export const RoomsContext = React.createContext<Partial<RoomsContextValue>>(
  INITIAL_ROOMS_CONTEXT_VALUE
);

const RoomsProvider: FunctionComponent = (props) => {
  const firebaseService = useContext(FirebaseContext);
  const [rooms, setRooms] = useState<RoomMap>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    return firebaseService.db.collection("rooms").onSnapshot((qs) => {
      const rooms: RoomMap = qs.docs
        .map((doc) => ({
          id: doc.id,
          ...(doc.data() as IRoomRecord),
          createdAt: doc.data().createdAt.toDate(),
        }))
        .reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
      setRooms(rooms);
      setLoaded(true);
    });
  }, [firebaseService]);

  const createRoom = async (room: IRoomRecord) => {
    const createdAt = new Date();
    const newRoom = await firebaseService.db
      .collection("rooms")
      .add({ ...room, createdAt });
    return newRoom.id;
  };

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        loaded,
        roomsService: { createRoom },
      }}
    >
      {props.children}
    </RoomsContext.Provider>
  );
};

export default RoomsProvider;
