import React, { useState, FunctionComponent, useContext } from "react";

import "./add-question.styles.scss";
import { QuestionsContext } from "../../services/questions/questions.provider";
import AuthContext from "../../services/auth/auth.context";
import { IQuestionRecord } from "../../services/questions/questions.types";

interface AddQuestionFormProps {
  roomId: string;
}

const AddQuestionForm: FunctionComponent<AddQuestionFormProps> = ({
  roomId,
}) => {
  const { user } = useContext(AuthContext);
  const { questionsService } = useContext(QuestionsContext);

  const [title, setTitle] = useState("");
  const [anonymous, setAnonymous] = useState(true);

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const userId = user?.uid || "TODO";
    if (!title) {
      alert("Please make sure to type out your question.");
      return;
    }
    const question: IQuestionRecord = {
      title,
      anonymous,
      answered: false,
      authorId: userId,
      upVotes: 1,
    };
    // TODO: Handle Possible Errors here?
    questionsService?.askQuestion(question);
  };

  const buttonText = anonymous ? "Anonymously..." : `As ${user?.email}`;

  return (
    <div className="inline-form">
      <input
        type="text"
        name="title"
        value={title}
        placeholder="Your question .. ?"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={() => setAnonymous(!anonymous)}
        className={anonymous ? "anonymously" : ""}
      >
        {buttonText}
      </button>
      <button onClick={onSubmit}>Ask</button>
    </div>
  );
};

interface AddQuestionProps {
  roomId: string;
}

const AddQuestion: FunctionComponent<AddQuestionProps> = ({ roomId }) => {
  return <AddQuestionForm roomId={roomId} />;
};

export default AddQuestion;
