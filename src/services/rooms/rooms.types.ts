export interface IRoomRecord {
  name: string;
  autoApprove?: boolean;
  activeQuestionId?: string;
}

export interface IRoom extends IRoomRecord {
  id: string;
  createdAt: Date;
}

export interface RoomMap {
  [key: string]: IRoom;
}
