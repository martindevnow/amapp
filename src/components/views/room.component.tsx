import React, { useContext } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import * as ROUTES from "../../constants/routes";

import { RoomMap } from "../../services/rooms/rooms.types";
import QuestionsProvider from "../../services/questions/questions.provider";
import { RoomsContext } from "../../services/rooms/rooms.provider";

import useAuth from "../../hooks/useAuth.hook";
import Loading from "../ui/loading.component";
import InlineError from "../ui/errors/inline-error.component";
import { LGHeader } from "../ui/header.component";
import { default as UICentered } from "../ui/centered.component";
import Room from "../room.component";

const Centered = styled(UICentered)`
  margin-top: 100px;
`;

const RoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { rooms, loaded } = useContext(RoomsContext);
  const { user, loaded: userLoaded } = useAuth();

  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (userLoaded && !user) {
      history.push(ROUTES.SIGN_IN, { prevPage: location });
    }
  }, [history, user, userLoaded, location]);

  if (!loaded) {
    return (
      <Centered>
        <Loading />
      </Centered>
    );
  }

  const room = (rooms as RoomMap)[roomId];

  if (!room) {
    return (
      <>
        <LGHeader style={{ textAlign: "left" }}>404</LGHeader>
        <InlineError show>No room with the ID "{roomId}" was found</InlineError>
      </>
    );
  }

  return (
    <QuestionsProvider roomId={roomId}>
      <Room room={(rooms as RoomMap)[roomId]} />
    </QuestionsProvider>
  );
};

export default RoomPage;
