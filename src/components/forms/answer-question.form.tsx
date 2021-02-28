import React, { useContext, useState } from "react";
import { IQuestion } from "../../services/questions/questions.types";
import { QuestionsContext } from "../../services/questions/questions.provider";
import Input from "../ui/input.component";
import Button from "../ui/button.component";
import useToast from "../../hooks/useToast.hook";
import Toast from "../ui/toast.component";

const AnswerQuestionForm = ({ question }: { question: IQuestion }) => {
  const { questionsService } = useContext(QuestionsContext);
  const [answer, setAnswer] = useState(question?.answer || "");
  const { isToastActive, displayToast } = useToast(5000);
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

export default AnswerQuestionForm;
