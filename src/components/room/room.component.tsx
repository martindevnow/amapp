/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useContext, FunctionComponent } from "react";
import { useParams, withRouter, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { IRoom, RoomMap } from "../../services/rooms/rooms.types";
import QuestionFeed from "../question-feed/question-feed.component";
import AddQuestion from "../add-question/add-question.component";
import QuestionsProvider, {
  QuestionsContext,
} from "../../services/questions/questions.provider";
import { RoomsContext } from "../../services/rooms/rooms.provider";
import Loading from "../loading/loading.component";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";
import Question from "../question/question.component";
import Button, { IconButton } from "../ui/button/button.component";
import Answer from "../answer/answer.component";
import { useAuth } from "../../services/auth/auth.provider";
import { ReactComponent as ArchiveIcon } from "../../assets/fa/solid/archive.svg";
import { ReactComponent as BoxOpenIcon } from "../../assets/fa/solid/box-open.svg";
import { useToast } from "../../hooks/useToast.hook";
import styled from "@emotion/styled";

const ArchiveRoomButton = ({
  roomId,
  isArchived,
}: {
  roomId: string;
  isArchived: boolean;
}) => {
  const roomService = useContext(RoomsContext);
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

interface RoomProps {
  room: IRoom;
}

const ActionMenu = styled.div`
  padding: 1rem;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;
`;

const Title = styled.h1`
  flex-grow: 1;
`;

const Room: FunctionComponent<RoomProps> = ({ room }) => {
  const { questions, questionsService } = useContext(QuestionsContext);
  const activeQuestion = questions?.find((q) => q.id === room.activeQuestionId);
  const clearActiveQuestion = async () => {
    await questionsService?.clearActiveQuestion();
  };

  if (!room) return null;
  return (
    <React.Fragment>
      <Section>
        <Title>Welcome to {room.name}</Title>
        <Can aclAction={AclActions.ARCHIVE_ROOM}>
          <ActionMenu>
            <ArchiveRoomButton
              isArchived={!!room.isArchived}
              roomId={room.id}
            />
          </ActionMenu>
        </Can>
      </Section>

      <div
        className="upper"
        css={css`
          display: flex;
          justify-content: space-evenly;
          flex-direction: column;
          column-gap: 4rem;

          @media (min-width: 1020px) {
            flex-direction: row;
          }
        `}
      >
        <Can aclAction={AclActions.ASK_QUESTION}>
          <div className="left">
            <h2>Ask a question: </h2>
            <AddQuestion />
          </div>
        </Can>

        {room.activeQuestionId && activeQuestion && (
          <div className="right">
            <span
              css={css`
                margin-right: 1rem;
              `}
            >
              {" "}
              Current Question:
            </span>
            <Can aclAction={AclActions.CLEAR_ACTIVE_QUESTION}>
              <Button onClick={clearActiveQuestion}>Clear</Button>
            </Can>
            <Question question={activeQuestion} />
            <Can aclAction={AclActions.ANSWER_QUESTION}>
              <Answer question={activeQuestion} />
            </Can>
          </div>
        )}
      </div>
      <QuestionFeed roomId={room.id} />
    </React.Fragment>
  );
};

const RoomPage = ({ location }: any) => {
  const { roomId } = useParams<{ roomId: string }>();
  const { rooms, loaded } = useContext(RoomsContext);
  const { user, loaded: userLoaded } = useAuth();
  const history = useHistory();

  React.useEffect(() => {
    if (userLoaded && !user) {
      history.push(ROUTES.SIGN_IN, { prevPage: location });
    }
  }, [history, user, userLoaded, location]);

  return loaded ? (
    <QuestionsProvider roomId={roomId}>
      <Room room={(rooms as RoomMap)[roomId]} />
    </QuestionsProvider>
  ) : (
    <Loading />
  );
};

export default withRouter(RoomPage);
