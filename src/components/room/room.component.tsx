import React, { useContext, FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { useParams, withRouter, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { IRoom, RoomMap } from "../../services/rooms/rooms.types";
import QuestionFeed from "../question-feed/question-feed.component";
import AddQuestionForm from "../add-question/add-question-form.component";
import QuestionsProvider, {
  QuestionsContext,
} from "../../services/questions/questions.provider";
import { RoomsContext } from "../../services/rooms/rooms.provider";
import Loading from "../ui/loading/loading.component";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";
import Question from "../question/question.component";
import Button from "../ui/button/button.component";
import Answer from "../answer/answer.component";
import { useAuth } from "../../services/auth/auth.provider";

import ArchiveRoomButton from "../archive-room/archive-room-button.component";

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

const Top = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  column-gap: 4rem;

  @media (min-width: 1020px) {
    flex-direction: row;
  }
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

      <Top>
        <Can aclAction={AclActions.ASK_QUESTION}>
          <div className="left">
            <h2>Ask a question: </h2>
            <AddQuestionForm />
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
      </Top>
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
