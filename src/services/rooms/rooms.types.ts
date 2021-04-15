export interface IRoomRecord {
  name: string;
  autoApprove?: boolean;
  activeQuestionId?: string;
}

export interface IRoom extends IRoomRecord {
  id: string;
  createdAt: Date;
  isArchived?: boolean;
  cfVideoUrl?: string;
  zoomMeetingDate?: string;
  zoomMeetingTopic?: string;
  zoomRecordingStart?: Date;
}

export interface RoomMap {
  [key: string]: IRoom;
}
