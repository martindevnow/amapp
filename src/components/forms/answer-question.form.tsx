import React, { useContext, useState } from "react";
import { IQuestion } from "../../services/questions/questions.types";
import { QuestionsContext } from "../../services/questions/questions.provider";
import useToast from "../../hooks/useToast.hook";
import { ButtonDark } from "../ui/button.component";
import Toast from "../ui/toast.component";
import Textarea from "../ui/textarea.component";

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

      <Textarea
        style={{ marginTop: "20px", width: "100%" }}
        value={answer}
        placeholder="Answer..."
        onChange={(e) => setAnswer(e.target.value)}
      />
      <ButtonDark onClick={() => submitAnswer()}>Answer</ButtonDark>
    </>
  );
};

export default AnswerQuestionForm;
