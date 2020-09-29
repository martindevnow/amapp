/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState, useContext } from "react";

import { QuestionsContext } from "../../services/questions/questions.provider";
import AuthContext from "../../services/auth/auth.context";
import { IQuestionRecord } from "../../services/questions/questions.types";
import Button from "../ui/button/button.component";
import Input from "../ui/input/input.component";

import "./add-question.styles.scss";

const AddQuestionForm = () => {
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
      author: {
        uid: userId,
        name: anonymous ? "" : user?.displayName || "",
      },
      upVotes: 1,
    };
    // TODO: Handle Possible Errors here?
    questionsService?.askQuestion(question);
  };

  const buttonText = anonymous ? "Anonymously..." : `As ${user?.email}`;

  return (
    <div
      css={css`
        text-align: center;
      `}
    >
      <Input
        type="text"
        name="title"
        value={title}
        placeholder="Your question .. ?"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        onClick={() => setAnonymous(!anonymous)}
        className={anonymous ? "anonymously" : ""}
      >
        {buttonText}
      </Button>
      <Button onClick={onSubmit}>Ask</Button>
    </div>
  );
};

const AddQuestion = () => {
  return <AddQuestionForm />;
};

export default AddQuestion;
