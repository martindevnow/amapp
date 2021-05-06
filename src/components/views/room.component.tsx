import React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as CogsIcon } from "../../assets/fa/solid/cogs.svg";
import * as ROUTES from "../../constants/routes";
import QuestionsProvider from "../../services/questions/questions.provider";
import useAuth from "../../hooks/useAuth.hook";
import useRoom from "../../hooks/useRoom.hook";
import Loading from "../ui/loading.component";
import InlineError from "../ui/errors/inline-error.component";
import { LGHeader } from "../ui/header.component";
import { default as UICentered } from "../ui/centered.component";
import Room from "../room.component";
import RoomMetaForm from "../forms/room-meta.form";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";
import themeGet from "../../styles/themeGet";
import useToggle from "../../hooks/useToggle.hook";
import useOutsideClick from "../../hooks/useOutsideClick.hook";

const Centered = styled(UICentered)`
  margin-top: 100px;
`;

const FixedCard = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${themeGet("colors", "background")};
  padding: 2rem;
  border-radius: ${themeGet("border", "radius")};
  border: ${themeGet("border", "light")};
`;

const FixedIcon = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${themeGet("colors", "background")};
  margin-top: 1rem;
`;

const RoomPage = () => {
  const { user, loaded: userLoaded } = useAuth();
  const { roomId } = useParams<{ roomId: string }>();
  const { room, loaded } = useRoom(roomId);

  const history = useHistory();
  const location = useLocation();

  const [showMetaForm, toggleShowMetaForm] = useToggle();
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleOutsideClick = React.useCallback(() => {
    if (showMetaForm) {
      toggleShowMetaForm();
    }
  }, [showMetaForm, toggleShowMetaForm]);

  useOutsideClick(cardRef, handleOutsideClick);
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
      <Can aclAction={AclActions.UPDATE_ROOM}>
        <FixedIcon
          onClick={() => toggleShowMetaForm()}
          style={{ display: !showMetaForm ? "block" : "none" }}
        >
          <CogsIcon width="1.5rem" height="1.5rem" fill="green" />
        </FixedIcon>
        <FixedCard
          ref={cardRef}
          style={{ display: showMetaForm ? "block" : "none" }}
        >
          <RoomMetaForm onSaved={() => toggleShowMetaForm()} roomId={roomId} />
        </FixedCard>
      </Can>
    </QuestionsProvider>
  );
};

export default RoomPage;
