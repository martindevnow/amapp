import React, { FunctionComponent, useContext } from "react";
import styled from "styled-components";

import Can from "../hoc/can.component";
import Unless from "../hoc/unless.component";
import { AclActions } from "../services/auth/auth.acl";
import { QuestionsContext } from "../services/questions/questions.provider";
import { QuestionsService } from "../services/questions/questions.service";
import { IQuestion } from "../services/questions/questions.types";

import { ReactComponent as CheckIcon } from "../assets/fa/solid/check.svg";
import { ReactComponent as UpVoteIcon } from "../assets/fa/solid/arrow-up.svg";
import { ReactComponent as TrashIcon } from "../assets/fa/solid/trash-alt.svg";
import { ReactComponent as EyeSlashIcon } from "../assets/fa/solid/eye-slash.svg";
import { ReactComponent as CommentSlashIcon } from "../assets/fa/solid/comment-slash.svg";
import { ReactComponent as CommentIcon } from "../assets/fa/solid/comment.svg";
import { IconButton } from "./ui/button.component";
import { default as UICard } from "./ui/card.component";
import useAuth from "../hooks/useAuth.hook";
import useHasVoted from "../hooks/useHasVoted.hook";
import Column from "./layout/column.component";

const Card = styled(UICard)<{ backgroundColor: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  // TODO: only allow variants, not any background color
  // Infact, the main Card component should implement this API
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: space-between;
  padding: 12px;
`;

const AnswerText = styled.span`
  border-left: 4px solid lightgray;
  padding-left: 0.7rem;
  font-style: italic;
`;

interface QuestionProps {
  question: IQuestion;
  className?: string;
}

const Question: FunctionComponent<QuestionProps> = ({
  question,
  className,
}) => {
  const { user } = useAuth();
  const { questionsService } = useContext(QuestionsContext);
  const hasVoted = useHasVoted(question, user?.uid || "TODO");

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

  const backgroundColor = question.approved ? "white" : "#ffbbbb";
  const upVotedColor = "#ff4400";
  const upVoteColor = hasVoted ? upVotedColor : "#666";

  return (
    <Card backgroundColor={backgroundColor} className={className}>
      {!question.approved ? (
        <Can aclAction={AclActions.APPROVE_QUESTION}>
          <IconButton onClick={approveQuestion}>
            <CheckIcon width="1.5rem" height="1.5rem" fill="green" />
          </IconButton>
        </Can>
      ) : (
        <IconButton onClick={upVote}>
          <UpVoteIcon width="1.5rem" height="1.5rem" fill={upVoteColor} />
        </IconButton>
      )}

      <span>{question.approved ? question.upVotes : "..."}</span>

      {!question.answered ? (
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
      ) : (
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
      )}

      <Column>
        <p>{question.title}</p>
        {question?.answer && <AnswerText>{question.answer}</AnswerText>}
      </Column>

      <div style={{ float: "right", minWidth: "100px", textAlign: "right" }}>
        <span>
          {`${
            question.createdAt.getHours() < 12
              ? question.createdAt.getHours()
              : question.createdAt.getHours() - 12
          }:${question.createdAt.getMinutes().toString().padStart(2, "0")} ${
            question.createdAt.getHours() > 12 ? "PM" : "AM"
          }`}
        </span>

        {!question.deleted && (
          <Can aclAction={AclActions.DELETE_QUESTION}>
            <IconButton onClick={deleteQuestion}>
              <TrashIcon width="1.5rem" height="1.5rem" fill="red" />
            </IconButton>
          </Can>
        )}

        <div>
          {question.anonymous ? (
            <EyeSlashIcon width="1.5rem" height="1.5rem" fill="#555" />
          ) : (
            <span>{question.author.name}</span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Question;
