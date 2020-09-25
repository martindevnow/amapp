import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";

import "./question.styles.scss";
import AuthContext from "../../services/auth/auth.context";
import {
  QuestionsContext,
  QuestionsService,
} from "../../services/questions/questions.provider";
import { IQuestion } from "../../services/questions/questions.types";

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
      setHasVoted(voted || question.authorId === userId);
    };
    run();
  }, [authService, question, userId]);

  const upVote = () => {
    (questionsService as QuestionsService)
      .upVoteQuestion(question.id)
      .then()
      .catch((e) => alert(JSON.stringify(e)));
  };

  return (
    <div className="question">
      <span className="question-upvote-count">{question.upVotes}</span>
      <span className="question-title">{question.title}</span>
      <button className={hasVoted ? "has-voted" : ""} onClick={upVote}>
        ^
      </button>
    </div>
  );
};

export default Question;
