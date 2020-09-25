import React, { FunctionComponent, useContext } from "react";
import Question from "../question/question.component";
import { QuestionsContext } from "../../services/questions/questions.provider";
import { IQuestion } from "../../services/questions/questions.types";

interface QuestionFeedProps {
  roomId: string;
}

const QuestionFeed: FunctionComponent<QuestionFeedProps> = ({ roomId }) => {
  const { questions } = useContext(QuestionsContext);
  return (
    <section>
      {(questions as IQuestion[]).map((q) => (
        <Question key={q.id} roomId={roomId} question={q} />
      ))}
    </section>
  );
};

export default QuestionFeed;
