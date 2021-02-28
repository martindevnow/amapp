import React, { useContext } from "react";
import styled from "styled-components";

import Card from "./ui/card.component";
import Column from "./layout/column.component";
import ArchiveRoomButton from "./archive-room-button.component";

import { IRoom } from "./../services/rooms/rooms.types";
import QuestionFeed from "./question-feed.component";
import AddQuestionForm from "./forms/ask-question.form";
import { QuestionsContext } from "./../services/questions/questions.provider";

import Can from "./../hoc/can.component";
import { AclActions } from "./../services/auth/auth.acl";
import Question from "./question.component";
import Button from "./ui/button.component";
import Answer from "./forms/answer-question.form";
import { LGHeader, MDHeader } from "./ui/header.component";

const ActionMenu = styled.div`
  padding: 1rem;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  margin-top: 50px;
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

interface RoomProps {
  room: IRoom;
}

const Room: React.FC<RoomProps> = ({ room }) => {
  const { questions, questionsService } = useContext(QuestionsContext);
  const activeQuestion = questions?.find((q) => q.id === room.activeQuestionId);
  const clearActiveQuestion = () => questionsService?.clearActiveQuestion();

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

export default Room;
