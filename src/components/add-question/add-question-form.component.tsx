import React, { useState, useContext } from "react";

import { QuestionsContext } from "../../services/questions/questions.provider";
import { IQuestionRecord } from "../../services/questions/questions.types";
import useToast from "../../hooks/useToast.hook";

import Button, { ButtonDark } from "../ui/button/button.component";
import Input from "../ui/input/input.component";
import Toggle from "../ui/toggle/toggle.component";
import useToggle from "../../hooks/useToggle.hook";
import Card from "../ui/card/card.component";
import useAuth from "../../hooks/useAuth.hook";

const AddQuestionForm = () => {
  const { user } = useAuth();
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
        type="text"
        name="title"
        bleed
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
