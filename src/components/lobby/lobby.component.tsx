import React, { useContext } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";
import { RoomsContext } from "../../services/rooms/rooms.provider";
import CreateRoom from "../create-room/create-room.component";
import JoinRoom from "../join-room/join-room.component";

const sortByCreatedAt = (descending = true) => {
  if (descending === false) {
    return (a: any, b: any) => a.createdAt.getTime() - b.createdAt.getTime();
  }
  return (a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime();
};

const getMonthString = (monthNum: number) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthNum];
};

const getDaySuffix = (dayNum: number) => {
  // Teens are all `th`
  if (dayNum > 3 && dayNum <= 20) return "th";
  const remainder = dayNum % 10;
  switch (remainder) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const humanReadable = (date: Date) =>
  `${getMonthString(date.getMonth())} ${date.getDate()}${getDaySuffix(
    date.getDate()
  )} ${date.getFullYear()}`;

const sortByCreatedAtDesc = sortByCreatedAt(true);

const LobbyPage = () => {
  const { rooms } = useContext(RoomsContext);
  return (
    <div>
      <Can aclAction={AclActions.LIST_ROOMS}>
        <h2>Active Rooms</h2>
        {rooms &&
          Object.values(rooms)
            .sort(sortByCreatedAtDesc)
            .map((room) => (
              <React.Fragment key={room.id}>
                <Link key={room.id} to={ROUTES.ROOM_BY_ID(room.id)}>
                  {room.name}
                </Link>
                {" - "}
                <em>Created: {humanReadable(room.createdAt)}</em>
                <br />
              </React.Fragment>
            ))}
      </Can>
      <Can aclAction={AclActions.CREATE_ROOM}>
        <h2>Create a New Room</h2>
        <CreateRoom />
      </Can>

      <h2>Join an Open Room</h2>
      <JoinRoom />
    </div>
  );
};

export default LobbyPage;
