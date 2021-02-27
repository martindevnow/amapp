import React, { useContext, FunctionComponent } from "react";
import styled from "styled-components";
import { useParams, useHistory, useLocation } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { IRoom, RoomMap } from "../../services/rooms/rooms.types";
import QuestionFeed from "../question-feed/question-feed.component";
import AddQuestionForm from "../add-question/add-question-form.component";
import QuestionsProvider, {
  QuestionsContext,
} from "../../services/questions/questions.provider";
import { RoomsContext } from "../../services/rooms/rooms.provider";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";
import Question from "../question/question.component";
import Button from "../ui/button/button.component";
import Answer from "../answer/answer.component";

import ArchiveRoomButton from "../archive-room/archive-room-button.component";
import useAuth from "../../hooks/useAuth.hook";
import Column from "../ui/layout/column.component";
import Loading from "../ui/loading/loading.component";
import InlineError from "../ui/error/inline-error.component";
import { LGHeader, MDHeader } from "../ui/header/header.component";
import Card from "../ui/card/card.component";

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

const Title = styled(LGHeader)`
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

const Room: FunctionComponent<RoomProps> = ({ room }) => {
  const { questions, questionsService } = useContext(QuestionsContext);
  const activeQuestion = questions?.find((q) => q.id === room.activeQuestionId);
  const clearActiveQuestion = () => questionsService?.clearActiveQuestion();

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
            <Card>
              <MDHeader>Ask a Question</MDHeader>
              <AddQuestionForm />
            </Card>
          </Column>
        </Can>

        {room.activeQuestionId && activeQuestion && (
          <Column>
            <Card invisible>
              <MDHeader>Current Question</MDHeader>

              <Question question={activeQuestion} />
              <Can aclAction={AclActions.ANSWER_QUESTION}>
                <Answer question={activeQuestion} />
              </Can>
              <Can aclAction={AclActions.CLEAR_ACTIVE_QUESTION}>
                <Button onClick={clearActiveQuestion}>Clear Current Q</Button>
              </Can>
            </Card>
          </Column>
        )}
      </Top>
      <QuestionFeed roomId={room.id} />
    </>
  );
};

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
    return <Loading />;
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
