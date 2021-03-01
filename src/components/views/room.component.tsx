import React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import * as ROUTES from "../../constants/routes";
import QuestionsProvider from "../../services/questions/questions.provider";
import useAuth from "../../hooks/useAuth.hook";
import useRoom from "../../hooks/useRoom.hook";
import Loading from "../ui/loading.component";
import InlineError from "../ui/errors/inline-error.component";
import { LGHeader } from "../ui/header.component";
import { default as UICentered } from "../ui/centered.component";
import Room from "../room.component";

const Centered = styled(UICentered)`
  margin-top: 100px;
`;

const RoomPage = () => {
  const { user, loaded: userLoaded } = useAuth();
  const { roomId } = useParams<{ roomId: string }>();
  const { room, loaded } = useRoom(roomId);

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
      <Room room={room} />
    </QuestionsProvider>
  );
};

export default RoomPage;
