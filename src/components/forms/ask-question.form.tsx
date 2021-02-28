import React, { useState, useContext } from "react";

import { QuestionsContext } from "../../services/questions/questions.provider";
import { IQuestionRecord } from "../../services/questions/questions.types";
import useToast from "../../hooks/useToast.hook";

import Button, { ButtonDark } from "../ui/button.component";
import useToggle from "../../hooks/useToggle.hook";
import useAuth from "../../hooks/useAuth.hook";

import Input from "../ui/input.component";
import Toast from "../ui/toast.component";

const AskQuestionForm = () => {
  const { user } = useAuth();
  const { questionsService } = useContext(QuestionsContext);

  const { isToastActive, displayToast } = useToast(5000);
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

  return (
    <>
      <Toast show={isToastActive}>Your questions has been received</Toast>
      <Input
        type="text"
        name="title"
        bleed
        value={title}
        placeholder="Your question .. ?"
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* <Toggle onChange={toggleAnonymous} checked={isAnonymous} /> */}
      <Button
        onClick={() => toggleAnonymous()}
        as={isAnonymous ? ButtonDark : Button}
        style={{ marginBottom: "15px" }}
      >
        Anonymously
      </Button>
      <Button
        onClick={() => toggleAnonymous()}
        as={isAnonymous ? Button : ButtonDark}
        style={{ marginBottom: "15px" }}
      >
        As {user?.email}
      </Button>

      <ButtonDark style={{ display: "block" }} onClick={onSubmit}>
        Ask
      </ButtonDark>
    </>
  );
};

export default AskQuestionForm;
