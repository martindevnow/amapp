import React from "react";
import { IconButton } from "../ui/button/button.component";

import { ReactComponent as ArchiveIcon } from "../../assets/fa/solid/archive.svg";
import { ReactComponent as BoxOpenIcon } from "../../assets/fa/solid/box-open.svg";
import { RoomsContext } from "../../services/rooms/rooms.provider";

import useToast from "../../hooks/useToast.hook";

const ArchiveRoomButton = ({
  roomId,
  isArchived,
}: {
  roomId: string;
  isArchived: boolean;
}) => {
  const roomService = React.useContext(RoomsContext);
  const { isToastActive, displayToast, Toast } = useToast(5000);
  const unarchive = () => {
    return roomService?.roomsService
      ?.unarchiveRoom(roomId)
      .then(() => displayToast());
  };
  const archive = () => {
    return roomService?.roomsService
      ?.archiveRoom(roomId)
      .then(() => displayToast());
  };
  return (
    <React.Fragment>
      <Toast show={isToastActive}>
        {isArchived ? "Archived" : "Unarchived"}
      </Toast>
      <IconButton onClick={unarchive} disabled={!isArchived}>
        <BoxOpenIcon
          width="1.5rem"
          height="1.5rem"
          fill={isArchived ? "red" : "lightgray"}
        />
      </IconButton>
      <IconButton onClick={archive} disabled={isArchived}>
        <ArchiveIcon
          width="1.5rem"
          height="1.5rem"
          fill={isArchived ? "lightgray" : "red"}
        />
      </IconButton>
    </React.Fragment>
  );
};

export default ArchiveRoomButton;
