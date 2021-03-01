import React from "react";

import { RoomMap } from "./rooms.types";
import useAuth from "../../hooks/useAuth.hook";
import useFirebase from "../../hooks/useFirebase.hook";
import RoomsService from "./rooms.service";
import firebaseService from "../firebase/firebase.service";
// import Logger from "../../utils/Logger";

interface RoomsContextValue {
  roomsService: RoomsService;
  rooms: RoomMap;
  loaded: boolean;
}

const INITIAL_ROOMS_CONTEXT_VALUE = {
  rooms: {},
  loaded: false,
  roomsService: new RoomsService(firebaseService),
};

export const RoomsContext = React.createContext<RoomsContextValue>(
  INITIAL_ROOMS_CONTEXT_VALUE
);

const RoomsProvider: React.FC = (props) => {
  const firebaseService = useFirebase();
  const { user } = useAuth();

  const [rooms, setRooms] = React.useState<RoomMap>({});
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const roomsService = React.useMemo(() => new RoomsService(firebaseService), [
    firebaseService,
  ]);

  const loadRoomMap = (rooms: RoomMap) => {
    setRooms(rooms);
    setLoaded(true);
  };

  React.useEffect(() => {
    // Logger.log("RoomsProvider :: useEffect()");
    if (!user) {
      return;
    }
    // To only pull the data, and not subscribe to changed
    roomsService.list().then(loadRoomMap);

    // // Or, you can subscribe to changes (and return the unsubscribe function)
    // return roomsService.listWatcher(loadRoomMap);
  }, [roomsService, user]);

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        loaded,
        roomsService,
      }}
    >
      {props.children}
    </RoomsContext.Provider>
  );
};

export default RoomsProvider;
