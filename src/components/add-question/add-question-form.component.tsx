import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";

import { QuestionsContext } from "../../services/questions/questions.provider";
import AuthContext from "../../services/auth/auth.context";
import { IQuestionRecord } from "../../services/questions/questions.types";
import useToast from "../../hooks/useToast.hook";

import Button, { ButtonDark } from "../ui/button/button.component";
import Input from "../ui/input/input.component";
import Toggle from "../ui/toggle/toggle.component";
import useToggle from "../../hooks/useToggle.hook";

const Card = styled.div`
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const AddQuestionForm = () => {
  const { user } = useContext(AuthContext);
  const { questionsService } = useContext(QuestionsContext);

  const { isToastActive, displayToast, Toast } = useToast(5000);
  const [title, setTitle] = useState("");
  const [isAnonymous, toggleAnonymous] = useToggle(true);

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
      anonymous: isAnonymous,
      answered: false,
      author: {
        uid: userId,
        name: isAnonymous ? "" : user?.displayName || "",
      },
      upVotes: 1,
    };
    // TODO: Handle Possible Errors here?
    questionsService?.askQuestion(question).then((_: any) => {
      displayToast();
      setTitle("");
    });
  };

  const buttonText = isAnonymous ? "Anonymously..." : `As ${user?.email}`;

  return (
    <Card>
      <Toast show={isToastActive}>Your questions has been received</Toast>
      <Input
        css={css`
          width: 100%;
        `}
        type="text"
        name="title"
        value={title}
        placeholder="Your question .. ?"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Toggle onChange={toggleAnonymous} checked={isAnonymous} />
      <Button
        onClick={() => toggleAnonymous()}
        as={isAnonymous ? ButtonDark : Button}
      >
        {buttonText}
      </Button>
      <Button onClick={onSubmit}>Ask</Button>
    </Card>
  );
};

export default AddQuestionForm;
