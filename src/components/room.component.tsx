import React, { useContext } from "react";
import styled from "styled-components";

import Can from "./../hoc/can.component";
import { AclActions } from "./../services/auth/auth.acl";
import { IRoom } from "./../services/rooms/rooms.types";
import { QuestionsContext } from "./../services/questions/questions.provider";
import ArchiveRoomButton from "./archive-room-button.component";
import QuestionFeed from "./question-feed.component";
import Question from "./question.component";
import AddQuestionForm from "./forms/ask-question.form";
import AnswerQuestionForm from "./forms/answer-question.form";

import Column from "./layout/column.component";
import Card from "./ui/card.component";
import Button from "./ui/button.component";
import { LGHeader, MDHeader } from "./ui/header.component";
import useVideo from "../hooks/useVideoStream.hook";
import VideoPlayerProvider from "../services/video-player/video-player.provider";

const ActionMenu = styled.div`
  padding: 1rem;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  margin-top: 50px;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled(LGHeader)`
  /* flex-grow: 1; */
  margin-bottom: 0;
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

const Video = styled.video`
  width: 100%;
`;

interface RoomProps {
  room: IRoom;
}

const Room: React.FC<RoomProps> = ({ room }) => {
  const { questions, questionsService } = useContext(QuestionsContext);
  const activeQuestion = questions?.find((q) => q.id === room.activeQuestionId);
  const clearActiveQuestion = () => questionsService?.clearActiveQuestion();

  const [videoRef] = useVideo(room.cfVideoUrl);

  return (
    <VideoPlayerProvider player={videoRef.current}>
      <Section>
        <Title>{room.name}</Title>
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
        {!room.cfVideoUrl && (
          <Can aclAction={AclActions.ASK_QUESTION}>
            <Column>
              <Card>
                <MDHeader>Ask a Question</MDHeader>
                <AddQuestionForm />
              </Card>
            </Column>
          </Can>
        )}

        {room.cfVideoUrl && (
          <Column>
            <Video ref={videoRef} controls></Video>
          </Column>
        )}

        {room.activeQuestionId && !room.cfVideoUrl && activeQuestion && (
          <Column>
            <Card invisible>
              <MDHeader>Current Question</MDHeader>

              <Question question={activeQuestion} />
              <Can aclAction={AclActions.ANSWER_QUESTION}>
                <AnswerQuestionForm question={activeQuestion} />
              </Can>
              <Can aclAction={AclActions.CLEAR_ACTIVE_QUESTION}>
                <Button onClick={clearActiveQuestion}>Clear Current Q</Button>
              </Can>
            </Card>
          </Column>
        )}
      </Top>
      <QuestionFeed roomId={room.id} />
    </VideoPlayerProvider>
  );
};

export default Room;
