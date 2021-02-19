import React, { useContext, useState } from "react";
import { IQuestion } from "../../services/questions/questions.types";
import { QuestionsContext } from "../../services/questions/questions.provider";
import Input from "../ui/input/input.component";
import Button from "../ui/button/button.component";
import useToast from "../../hooks/useToast.hook";

const Answer = ({ question }: { question: IQuestion }) => {
  const { questionsService } = useContext(QuestionsContext);
  const [answer, setAnswer] = useState(question?.answer || "");
  const { isToastActive, displayToast, Toast } = useToast(5000);
  const submitAnswer = () => {
    questionsService?.answerQuestion(question.id, answer).then(() => {
      setAnswer("");
      displayToast();
    });
  };
  return (
    <>
      <Toast show={isToastActive}>Thank you.</Toast>

      <Input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button onClick={() => submitAnswer()}>Answer</Button>
    </>
  );
};

export default Answer;
