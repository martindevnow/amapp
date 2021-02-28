import { useEffect, useState } from "react";
import { IQuestion } from "../services/questions/questions.types";
import useAuth from "./useAuth.hook";

const useHasVoted = (question: IQuestion, userId: string) => {
  const { authService } = useAuth();
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const run = async () => {
      const voted = await authService.hasVotedForQuestion(question.id, userId);
      setHasVoted(voted || question.author.uid === userId);
    };
    run();
  }, [authService, question, userId]);

  return hasVoted;
};

export default useHasVoted;
