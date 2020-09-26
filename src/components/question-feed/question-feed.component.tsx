import React, { FunctionComponent, useContext, useState } from "react";

import Question from "../question/question.component";
import { QuestionsContext } from "../../services/questions/questions.provider";
import { IQuestion } from "../../services/questions/questions.types";
import { sortByCreatedAt, sortByUpVotes } from "../../services/utilities";
import Button from "../ui/button/button.component";

interface QuestionFeedProps {
  roomId: string;
}

const opposite = (order: "createdAt" | "upVotes") =>
  order === "createdAt" ? "upVotes" : "createdAt";

const QuestionFeed: FunctionComponent<QuestionFeedProps> = ({ roomId }) => {
  const { questions } = useContext(QuestionsContext);
  const [orderBy, setOrderBy] = useState<"createdAt" | "upVotes">("upVotes");

  return (
    <section>
      <Button
        onClick={() => {
          setOrderBy(opposite(orderBy));
        }}
      >
        {orderBy === "upVotes" ? "Newest" : "Most Votes"}
      </Button>
      {(questions as IQuestion[])
        .sort(orderBy === "upVotes" ? sortByUpVotes : sortByCreatedAt)
        .map((q) => (
          <Question key={q.id} roomId={roomId} question={q} />
        ))}
    </section>
  );
};

export default QuestionFeed;
