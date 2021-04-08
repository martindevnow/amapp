import React, { useContext } from "react";
import styled, { useTheme } from "styled-components";

import Can from "../hoc/can.component";
import Unless from "../hoc/unless.component";
import { AclActions } from "../services/auth/auth.acl";
import { QuestionsContext } from "../services/questions/questions.provider";
import { QuestionsService } from "../services/questions/questions.service";
import { IQuestion } from "../services/questions/questions.types";

import { ReactComponent as CheckIcon } from "../assets/fa/solid/check.svg";
import { ReactComponent as UpVoteIcon } from "../assets/fa/solid/arrow-up.svg";
import { ReactComponent as TrashIcon } from "../assets/fa/solid/trash-alt.svg";
import { ReactComponent as CommentSlashIcon } from "../assets/fa/solid/comment-slash.svg";
import { ReactComponent as CommentIcon } from "../assets/fa/solid/comment.svg";
import { IconButton } from "./ui/button.component";
import { default as UICard } from "./ui/card.component";
import InlineAnchor from "./ui/inline-anchor.component";
import useAuth from "../hooks/useAuth.hook";
import useHasVoted from "../hooks/useHasVoted.hook";
import Column from "./layout/column.component";
import useVideoPlayer from "../hooks/useVideoPlayer.hook";
import { toSeconds } from "../services/utilities";

const Card = styled(UICard)<{ highlighted: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  // TODO: only allow variants, not any background color
  // Infact, the main Card component should implement this API
  background-color: ${({ theme, highlighted }) =>
    highlighted ? "#ff6666" : theme.colors.background};
  justify-content: space-between;
  padding: 12px;
`;

const Right = styled.div`
  align-self: stretch;
  min-width: 100px;
  display: flex;
  text-align: right;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const AnswerText = styled.p`
  border-left: 4px solid lightgray;
  padding-left: 0.7rem;
  font-style: italic;
`;

const getTime = (dt: Date) =>
  `${
    dt.getHours() < 12 ? dt.getHours() : dt.getHours() - 12
  }:${dt.getMinutes().toString().padStart(2, "0")} ${
    dt.getHours() > 12 ? "PM" : "AM"
  }`;

interface QuestionProps {
  question: IQuestion;
  className?: string;
}

const Question: React.FC<QuestionProps> = ({ question, className }) => {
  const { user } = useAuth();
  const { questionsService } = useContext(QuestionsContext);
  const hasVoted = useHasVoted(question, user?.uid || "TODO");
  const theme = useTheme();

  const videoPlayer = useVideoPlayer();
  const handleSeek = (minutesColonSeconds?: string) => {
    if (!videoPlayer || !minutesColonSeconds) {
      return;
    }
    videoPlayer.currentTime = toSeconds(minutesColonSeconds);
  };
  const seek = question.answeredTimestamp && (
    <InlineAnchor onClick={() => handleSeek(question.answeredTimestamp)}>
      @ {question.answeredTimestamp}
    </InlineAnchor>
  );

  const upVote = () => {
    (questionsService as QuestionsService)
      .upVoteQuestion(question.id)
      .then()
      .catch((e) => alert(JSON.stringify(e)));
  };

  const approveQuestion = () => questionsService?.approveQuestion(question.id);

  const deleteQuestion = () => questionsService?.deleteQuestion(question.id);

  const markQuestionAsDiscussed = () =>
    questionsService?.markQuestionAsDiscussed(question.id);

  const unmarkQuestionAsDiscussed = () =>
    questionsService?.unmarkQuestionAsDiscussed(question.id);

  // const backgroundColor = question.approved ? "white" : "#ffbbbb";
  const upVoteColor = hasVoted ? theme.colors.primary : "#666";

  const askedAt = getTime(question.createdAt);

  return (
    <Card highlighted={!question.approved} className={className}>
      {question.approved ? (
        <IconButton onClick={upVote}>
          <UpVoteIcon width="1.5rem" height="1.5rem" fill={upVoteColor} />
        </IconButton>
      ) : (
        <Can aclAction={AclActions.APPROVE_QUESTION}>
          <IconButton onClick={approveQuestion}>
            <CheckIcon width="1.5rem" height="1.5rem" fill="green" />
          </IconButton>
        </Can>
      )}

      <span>{question.approved ? question.upVotes : "..."}</span>

      {question.answered ? (
        <>
          <Can aclAction={AclActions.MARK_FOR_DISCUSSION}>
            <IconButton onClick={unmarkQuestionAsDiscussed}>
              <CommentIcon width="1.5rem" height="1.5rem" fill="green" />
            </IconButton>
          </Can>
          <Unless aclAction={AclActions.MARK_FOR_DISCUSSION}>
            <IconButton>
              <CommentIcon width="1.5rem" height="1.5rem" fill="green" />
            </IconButton>
          </Unless>
        </>
      ) : (
        <>
          <Can aclAction={AclActions.MARK_FOR_DISCUSSION}>
            <IconButton onClick={markQuestionAsDiscussed}>
              <CommentSlashIcon width="1.5rem" height="1.5rem" fill="green" />
            </IconButton>
          </Can>
          <Unless aclAction={AclActions.MARK_FOR_DISCUSSION}>
            <IconButton>
              <CommentSlashIcon width="1.5rem" height="1.5rem" fill="green" />
            </IconButton>
          </Unless>
        </>
      )}

      <Column>
        <p>{question.title}</p>
        {question?.answer && !question.answeredTimestamp && (
          <AnswerText>{question.answer}</AnswerText>
        )}
        {seek}
      </Column>

      <Right>
        <span>{askedAt}</span>

        {!question.deleted && (
          <Can aclAction={AclActions.DELETE_QUESTION}>
            <IconButton onClick={deleteQuestion}>
              <TrashIcon width="1.5rem" height="1.5rem" fill="red" />
            </IconButton>
          </Can>
        )}

        <div>{!question.anonymous && <span>{question.author.name}</span>}</div>
      </Right>
    </Card>
  );
};

export default Question;
