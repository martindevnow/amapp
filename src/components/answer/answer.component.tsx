import React, { useContext, useState } from "react";
import { IQuestion } from "../../services/questions/questions.types";
import { QuestionsContext } from "../../services/questions/questions.provider";
import Input from "../ui/input/input.component";
import Button from "../ui/button/button.component";

const Answer = ({ question }: { question: IQuestion }) => {
  const { questionsService } = useContext(QuestionsContext);
  const [answer, setAnswer] = useState(question?.answer || "");
  const submitAnswer = () => {
    questionsService?.answerQuestion(question.id, answer).then(() => {
      setAnswer("");
      alert("thanks");
    });
  };
  return (
    <div>
      <Input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button onClick={() => submitAnswer()}>Answer</Button>
    </div>
  );
};

export default Answer;
