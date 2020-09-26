import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";

import AuthContext from "../../services/auth/auth.context";
import { QuestionsContext } from "../../services/questions/questions.provider";
import { QuestionsService } from "../../services/questions/questions.service";
import { IQuestion } from "../../services/questions/questions.types";
import Button from "../ui/button/button.component";
import CheckIcon from "../ui/icon/check-icon.component";
import UpVoteIcon from "../ui/icon/up-vote-icon.component";

import "./question.styles.scss";
import TrashIcon from "../ui/icon/trash-icon.component";
import EyeSlashIcon from "../ui/icon/eye-slash-icon.component";

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

  const questionClass: string = new Array<string>()
    .concat(question.anonymous ? ["anonymous"] : [])
    .concat(question.answered ? ["answered"] : ["unanswered"])
    .concat(question.approved ? ["approved"] : ["unapproved"])
    .concat(question.deleted ? ["deleted"] : [])
    .join(" ");

  return (
    <div className={`question ${questionClass}`}>
      {!question.approved ? (
        <Can aclAction={AclActions.APPROVE_QUESTION}>
          <Button onClick={approveQuestion}>
            <CheckIcon fill="green" />
          </Button>
        </Can>
      ) : (
        <Button className="question-upvote-button" onClick={upVote}>
          <UpVoteIcon fill={hasVoted ? "red" : "black"} />
        </Button>
      )}

      <span className="question-upvote-count">
        {question.approved ? question.upVotes : "..."}
      </span>
      <p className="question-title">{question.title}</p>
      {question.anonymous ? (
        <EyeSlashIcon fill="black" />
      ) : (
        <span>{question.author.name}</span>
      )}
      {!question.deleted && (
        <Can aclAction={AclActions.DELETE_QUESTION}>
          <Button onClick={deleteQuestion}>
            <TrashIcon fill="red" />
          </Button>
        </Can>
      )}
    </div>
  );
};

export default Question;
