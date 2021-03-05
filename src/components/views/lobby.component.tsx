import styled, { css } from "styled-components";
import React, { useContext, useState } from "react";

import * as ROUTES from "../../constants/routes";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";
import { RoomsContext } from "../../services/rooms/rooms.provider";
import { IRoom } from "../../services/rooms/rooms.types";
import CreateRoomForm from "../forms/create-room.form";
import JoinRoomForm from "../forms/join-room.form";
import Column from "../layout/column.component";
import { LGHeader, MDHeader, SMHeader } from "../ui/header.component";
import Card from "../ui/card.component";
import { Label } from "../ui/label.component";
import Link from "../ui/link.component";
import { media } from "../../styles/themes";

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

/**
 * 1,21,31: st
 * 2,22: nd
 * 3,23: rd
 * 4-20,24-30: th
 * @param dayNum
 */
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
`;

const OptionLabel = styled(Label)`
  display: inline;
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

  ${media("md")(css`
    flex-direction: column;
  `)}
`;

const RoomSection = styled.div``;

const LobbyPage = () => {
  const { rooms } = useContext(RoomsContext);
  const [showArchived, setShowArchived] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const shouldIncludeArchived = (room: IRoom) =>
    showArchived ? true : !room.isArchived;
  const onShowArchivedToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowArchived(event.target.checked);
  };
  const onShowDatesToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowDates(event.target.checked);
  };
  return (
    <Page>
      <Flex>
        <Column>
          <Can aclAction={AclActions.LIST_ROOMS}>
            <LGHeader>{`${showArchived ? "All" : "Active"} Rooms`}</LGHeader>
            {rooms &&
              Object.values(rooms)
                .sort(sortByCreatedAtDesc)
                .filter(shouldIncludeArchived)
                .map((room) => (
                  <RoomSection key={room.id}>
                    <Link key={room.id} to={ROUTES.ROOM_BY_ID(room.id)}>
                      {room.name}
                    </Link>
                    {showDates && (
                      <em> - Created: {humanReadable(room.createdAt)}</em>
                    )}
                    <br />
                  </RoomSection>
                ))}
          </Can>
        </Column>
        <ActionMenu>
          <SMHeader>Options</SMHeader>
          <div>
            <OptionLabel htmlFor="showArchived">Show Archived</OptionLabel>{" "}
            <input
              onChange={(e) => onShowArchivedToggle(e)}
              type="checkbox"
              name="showArchived"
              id="showArchived"
            />
          </div>
          <div>
            <OptionLabel htmlFor="showDates">Show Dates</OptionLabel>{" "}
            <input
              onChange={(e) => onShowDatesToggle(e)}
              type="checkbox"
              name="showDates"
              id="showDates"
            />
          </div>
        </ActionMenu>
      </Flex>

      <Flex>
        <Column>
          <Card>
            <MDHeader>Join an Open Room</MDHeader>
            <JoinRoomForm />
          </Card>
        </Column>
        <Can aclAction={AclActions.CREATE_ROOM}>
          <Column>
            <Card>
              <MDHeader>Create a New Room</MDHeader>
              <CreateRoomForm />
            </Card>
          </Column>
        </Can>
      </Flex>
    </Page>
  );
};

export default LobbyPage;
