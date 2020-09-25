import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import AuthContext from "../auth/auth.context";
import FirebaseContext from "../firebase/firebase.context";
import { IQuestion, IQuestionRecord } from "./questions.types";

interface QuestionsProviderProps {
  roomId: string;
}

export interface QuestionsService {
  askQuestion: (question: IQuestionRecord) => Promise<boolean>;
  upVoteQuestion: (questionId: string) => Promise<boolean>;
}

interface QuestionsContextValue {
  questions: IQuestion[];
  questionsService: QuestionsService;
}

export const QuestionsContext = React.createContext<
  Partial<QuestionsContextValue>
>({
  questions: [],
});

const QuestionsProvider: FunctionComponent<QuestionsProviderProps> = ({
  children,
  roomId,
}) => {
  const firebase = useContext(FirebaseContext);
  const { user, authService } = useContext(AuthContext);

  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    return firebase.db
      .collection("rooms")
      .doc(roomId)
      .collection("questions")
      .onSnapshot((qs) => {
        const questions = qs.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as IQuestionRecord),
        }));
        setQuestions(questions);
      });
  }, [firebase, roomId]);

  const askQuestion = async (question: IQuestionRecord) => {
    // TODO: Add ACL layer, here?
    console.log("askQuestionInRoom", { roomId }, { user: user });
    const questionRef = firebase.db
      .collection("rooms")
      .doc(roomId)
      .collection("questions")
      .add(question);
    const questionAskedSnapshot = await (await questionRef).get();
    const questionId = questionAskedSnapshot.id;

    if (user && user.uid) {
      authService
        .userProfileRef(user.uid)
        .collection("votes")
        .doc(questionId)
        .set({ questionId });
    }
    return true;
  };

  const upVoteQuestion = async (questionId: string) => {
    const batch = firebase.db.batch();
    const questionRef = firebase.db
      .collection("rooms")
      .doc(roomId)
      .collection("questions")
      .doc(questionId);

    // TODO: Expand ACL here
    if (user && user.uid) {
      const hasVotedRef = authService
        .userProfileRef(user.uid)
        .collection("votes")
        .doc(questionId);
      const hasVoted = await hasVotedRef.get();
      // Check if the user already voted
      if (hasVoted.exists) {
        // If so, do nothing
        return Promise.reject("The user has already voted for this question");
      }
      batch.set(hasVotedRef, { questionId });
    }

    // if not, then increment the count, and add a log that this user has now voted
    batch.set(questionRef, { upVotes: firebase.increment }, { merge: true });
    batch.commit();
    return true;
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        questionsService: { askQuestion, upVoteQuestion },
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
