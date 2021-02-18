import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { css } from "styled-components";
import styled from "@emotion/styled";

import Can from "../../hoc/can.component";

import { AclActions } from "../../services/auth/auth.acl";

import AuthContext from "../../services/auth/auth.context";
import { QuestionsContext } from "../../services/questions/questions.provider";
import { QuestionsService } from "../../services/questions/questions.service";
import { IQuestion } from "../../services/questions/questions.types";

import { ReactComponent as CheckIcon } from "../../assets/fa/solid/check.svg";
import { ReactComponent as UpVoteIcon } from "../../assets/fa/solid/arrow-up.svg";
import { ReactComponent as TrashIcon } from "../../assets/fa/solid/trash-alt.svg";
import { ReactComponent as EyeSlashIcon } from "../../assets/fa/solid/eye-slash.svg";
import { ReactComponent as CommentSlashIcon } from "../../assets/fa/solid/comment-slash.svg";
import { ReactComponent as CommentIcon } from "../../assets/fa/solid/comment.svg";
import { IconButton } from "../ui/button/button.component";
import Unless from "../../hoc/unless.component";

const Container = styled.div<any>`
  width: 100%;
  display: flex;
  border: 1px solid lightgray;
  align-items: center;
  background-color: ${({ backgroundColor }: any) => backgroundColor};
`;

const AnswerText = styled.span<any>`
  border-left: 4px solid lightgray;
  padding-left: 0.7rem;
  font-style: italic;
`;

interface QuestionProps {
  question: IQuestion;
}

const Question: FunctionComponent<QuestionProps> = ({ question }) => {
  const { user, authService } = useContext(AuthContext);
  const userId = user?.uid || "TODO";

  const [hasVoted, setHasVoted] = useState(false);
  const { questionsService } = useContext(QuestionsContext);

  useEffect(() => {
    const run = async () => {
      const voted = await authService.hasVotedForQuestion(question.id, userId);
      setHasVoted(voted || question.author.uid === userId);
    };
    run();
  }, [authService, question, userId]);

  const upVote = () => {
    (questionsService as QuestionsService)
      .upVoteQuestion(question.id)
      .then()
      .catch((e) => alert(JSON.stringify(e)));
  };

  const approveQuestion = async () => {
    await questionsService?.approveQuestion(question.id);
  };

  const deleteQuestion = async () => {
    await questionsService?.deleteQuestion(question.id);
  };

  const markQuestionAsDiscussed = async () => {
    await questionsService?.markQuestionAsDiscussed(question.id);
  };

  const unmarkQuestionAsDiscussed = async () => {
    await questionsService?.unmarkQuestionAsDiscussed(question.id);
  };

  const backgroundColor = question.approved ? "white" : "#ffbbbb";
  const upVotedColor = "#ff4400";
  const upVoteColor = hasVoted ? upVotedColor : "#666";
  return (
    <Container backgroundColor={backgroundColor}>
      {!question.approved ? (
        <Can aclAction={AclActions.APPROVE_QUESTION}>
          <IconButton
            css={css`
              min-width: 3rem;
            `}
            onClick={approveQuestion}
          >
            <CheckIcon width="1.5rem" height="1.5rem" fill="green" />
          </IconButton>
        </Can>
      ) : (
        <IconButton
          css={css`
            min-width: 3rem;
            :hover {
              & svg {
                fill: ${upVotedColor};
              }
            }
          `}
          onClick={upVote}
        >
          <UpVoteIcon width="1.5rem" height="1.5rem" fill={upVoteColor} />
        </IconButton>
      )}

      <span
        css={css`
          width: 3rem;
          min-width: 3rem;
          text-align: center;
        `}
      >
        {question.approved ? question.upVotes : "..."}
      </span>

      {!question.answered ? (
        <React.Fragment>
          <Can aclAction={AclActions.MARK_FOR_DISCUSSION}>
            <IconButton onClick={markQuestionAsDiscussed}>
              <CommentSlashIcon width="1.5rem" height="1.5rem" fill="green" />
            </IconButton>
          </Can>
          <Unless aclAction={AclActions.MARK_FOR_DISCUSSION}>
            <IconButton
              css={css`
                cursor: default;
              `}
            >
              <CommentSlashIcon width="1.5rem" height="1.5rem" fill="green" />
            </IconButton>
          </Unless>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Can aclAction={AclActions.MARK_FOR_DISCUSSION}>
            <IconButton onClick={unmarkQuestionAsDiscussed}>
              <CommentIcon width="1.5rem" height="1.5rem" fill="green" />
            </IconButton>
          </Can>
          <Unless aclAction={AclActions.MARK_FOR_DISCUSSION}>
            <IconButton
              css={css`
                min-width: 3rem;
                cursor: default;
              `}
            >
              <CommentIcon width="1.5rem" height="1.5rem" fill="green" />
            </IconButton>
          </Unless>
        </React.Fragment>
      )}

      <div
        css={css`
          flex-grow: 2;
          padding: 0.5rem;
          position: relative;
        `}
      >
        <p
          css={css`
            margin-right: 1.5rem;
          `}
        >
          {question.title}
        </p>
        {question?.answer && <AnswerText>{question.answer}</AnswerText>}
      </div>

      <div
        css={css`
          text-align: right;
        `}
      >
        <span
          css={css`
            font-size: 0.8rem;
            margin-right: 0.7rem;
            margin-top: 0.7rem;
            display: block;
            min-width: 6rem;
          `}
        >
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
            <IconButton
              css={css`
                min-width: 3rem;
                margin-left: auto;
              `}
              onClick={deleteQuestion}
            >
              <TrashIcon width="1.5rem" height="1.5rem" fill="red" />
            </IconButton>
          </Can>
        )}

        <div
          css={css`
            /* float: right; */
            margin-right: 0.7rem;
          `}
        >
          {question.anonymous ? (
            <EyeSlashIcon width="1.5rem" height="1.5rem" fill="#555" />
          ) : (
            <span>{question.author.name}</span>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Question;
