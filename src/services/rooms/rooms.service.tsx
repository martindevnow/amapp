// import Logger from "../../utils/Logger";
import { FirebaseService } from "../firebase/firebase.service";
import { IRoomRecord, RoomMap } from "./rooms.types";

class RoomsService {
  private auth: firebase.auth.Auth;
  private db: firebase.firestore.Firestore;
  private storage: firebase.storage.Storage;

  constructor(firebaseService: FirebaseService) {
    // Logger.log("RoomsService :: Constructor");
    this.auth = firebaseService.auth;
    this.db = firebaseService.db;
    this.storage = firebaseService.storage;
  }

  transformRoomRecord = (
    doc: firebase.firestore.QueryDocumentSnapshot<
      firebase.firestore.DocumentData | undefined
    >
  ) => ({
    id: doc.id,
    ...(doc.data() as IRoomRecord),
    createdAt: doc.data()?.createdAt.toDate(),
  });

  list = async () => {
    const snapshot = await this.db.collection("rooms").get();
    return snapshot.docs
      .map(this.transformRoomRecord)
      .reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
  };

  readWatcher = (roomId: string, cb: Function) => {
    return this.db.doc(`rooms/${roomId}`).onSnapshot((ds) => {
      const room = this.transformRoomRecord(ds);
      return cb(room);
    });
  };

  listWatcher = (cb: Function) => {
    return this.db.collection("rooms").onSnapshot((qs) => {
      const rooms: RoomMap = qs.docs
        .map(this.transformRoomRecord)
        .reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
      return cb(rooms);
    });
  };

  createRoom = async (room: IRoomRecord) => {
    const createdAt = new Date();
    const newRoom = await this.db
      .collection("rooms")
      .add({ ...room, createdAt });
    return newRoom.id;
  };

  archiveRoom = async (roomId: string) => {
    return this.db.doc(`rooms/${roomId}`).set(
      {
        isArchived: true,
      },
      { merge: true }
    );
  };

  unarchiveRoom = async (roomId: string) => {
    return this.db.doc(`rooms/${roomId}`).set(
      {
        isArchived: false,
      },
      { merge: true }
    );
  };
}

export default RoomsService;
