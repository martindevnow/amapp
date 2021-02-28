import styled from "styled-components";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";
import { RoomsContext } from "../../services/rooms/rooms.provider";
import { IRoom } from "../../services/rooms/rooms.types";
import CreateRoom from "../forms/create-room.form";
import JoinRoom from "../forms/join-room.form";
import Column from "../layout/column.component";
import { LGHeader, MDHeader, SMHeader } from "../ui/header.component";
import Card from "../ui/card.component";

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

const Page = styled.div`
  width: 100%;
  display: flex;
  row-gap: 50px;
  flex-wrap: wrap;
  position: relative;
`;

// TODO: Make a component for hover/drop-down menus and admin type actions
const ActionMenu = styled.div`
  padding: 1rem;
  position: absolute;
  top: 80px;
  right: 0;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 50px;
  margin-top: 50px;

  ${Card} {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const LobbyPage = () => {
  const { rooms } = useContext(RoomsContext);
  const [showArchived, setShowArchived] = useState(false);
  const shouldIncludeArchived = (room: IRoom) =>
    showArchived ? true : !room.isArchived;
  const onShowArchivedToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowArchived(event.target.checked);
  };
  return (
    <Page>
      <ActionMenu>
        <SMHeader>Options</SMHeader>
        <label htmlFor="showArchived">Show Archived</label>{" "}
        <input
          onChange={(e) => onShowArchivedToggle(e)}
          type="checkbox"
          name="showArchived"
          id="showArchived"
          value="showArchived"
        />
      </ActionMenu>

      <div style={{ width: "100%" }}>
        <Can aclAction={AclActions.LIST_ROOMS}>
          <LGHeader>{`Active${
            showArchived ? " and Archived" : ""
          } Rooms`}</LGHeader>
          {rooms &&
            Object.values(rooms)
              .sort(sortByCreatedAtDesc)
              .filter(shouldIncludeArchived)
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
      </div>

      <Flex>
        <Column>
          <Card>
            <MDHeader>Join an Open Room</MDHeader>
            <JoinRoom />
          </Card>
        </Column>
        <Can aclAction={AclActions.CREATE_ROOM}>
          <Column>
            <Card>
              <MDHeader>Create a New Room</MDHeader>
              <CreateRoom />
            </Card>
          </Column>
        </Can>
      </Flex>
    </Page>
  );
};

export default LobbyPage;
