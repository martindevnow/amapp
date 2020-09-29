/** @jsx jsx */
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { css, jsx } from "@emotion/core";

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
import React from "react";
import Unless from "../../hoc/unless.component";

interface QuestionProps {
  roomId: string;
  question: IQuestion;
}

const Question: FunctionComponent<QuestionProps> = ({ roomId, question }) => {
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

  const answerQuestion = async () => {
    await questionsService?.answerQuestion(question.id);
  };

  const unanswerQuestion = async () => {
    await questionsService?.unanswerQuestion(question.id);
  };

  const backgroundColor = question.approved ? "white" : "#ffbbbb";
  const upVotedColor = "#ff4400";
  const upVoteColor = hasVoted ? upVotedColor : "#666";
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        border: 1px solid lightgray;
        align-items: center;
        background-color: ${backgroundColor};
      `}
    >
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
          <Can aclAction={AclActions.ANSWER_QUESTION}>
            <IconButton onClick={answerQuestion}>
              <CommentSlashIcon width="1.5rem" height="1.5rem" fill="green" />
            </IconButton>
          </Can>
          <Unless aclAction={AclActions.ANSWER_QUESTION}>
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
          <Can aclAction={AclActions.ANSWER_QUESTION}>
            <IconButton onClick={unanswerQuestion}>
              <CommentIcon width="1.5rem" height="1.5rem" fill="green" />
            </IconButton>
          </Can>
          <Unless aclAction={AclActions.ANSWER_QUESTION}>
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
        `}
      >
        <p>{question.title}</p>
        {question.anonymous ? (
          <EyeSlashIcon
            css={css`
              float: right;
            `}
            width="1.5rem"
            height="1.5rem"
            fill="#555"
          />
        ) : (
          <span
            css={css`
              float: right;
            `}
          >
            {question.author.name}
          </span>
        )}
      </div>

      {!question.deleted && (
        <Can aclAction={AclActions.DELETE_QUESTION}>
          <IconButton
            css={css`
              justify-self: flex-end;
              min-width: 3rem;
            `}
            onClick={deleteQuestion}
          >
            <TrashIcon width="1.5rem" height="1.5rem" fill="red" />
          </IconButton>
        </Can>
      )}
    </div>
  );
};

export default Question;
