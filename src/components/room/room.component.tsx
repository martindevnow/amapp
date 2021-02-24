import React, { useContext, FunctionComponent } from "react";
import styled from "styled-components";
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

import ArchiveRoomButton from "../archive-room/archive-room-button.component";
import useAuth from "../../hooks/useAuth.hook";

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
  justify-content: space-between;
  flex-direction: column;
  column-gap: 1rem;

  @media (min-width: 1020px) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  flex: 1 1 0;
`;

const Room: FunctionComponent<RoomProps> = ({ room }) => {
  const { questions, questionsService } = useContext(QuestionsContext);
  const activeQuestion = questions?.find((q) => q.id === room.activeQuestionId);
  const clearActiveQuestion = async () => {
    await questionsService?.clearActiveQuestion();
  };

  if (!room) return null;
  return (
    <>
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
          <Column>
            <h2>Ask a question: </h2>
            <AddQuestionForm />
          </Column>
        </Can>

        {room.activeQuestionId && activeQuestion && (
          <Column>
            <h2>Current Question</h2>

            <Question question={activeQuestion} />
            <Can aclAction={AclActions.ANSWER_QUESTION}>
              <Answer question={activeQuestion} />
            </Can>
            <Can aclAction={AclActions.CLEAR_ACTIVE_QUESTION}>
              <Button onClick={clearActiveQuestion}>Clear Current Q</Button>
            </Can>
          </Column>
        )}
      </Top>
      <QuestionFeed roomId={room.id} />
    </>
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
