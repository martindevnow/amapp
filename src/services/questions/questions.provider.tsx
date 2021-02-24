import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useAuth from "../../hooks/useAuth.hook";

import FirebaseContext from "../firebase/firebase.context";
import { QuestionsService } from "./questions.service";
import { IQuestion, IQuestionRecord } from "./questions.types";

interface QuestionsProviderProps {
  roomId: string;
}

interface QuestionsContextValue {
  questions: IQuestion[];
  loaded: boolean;
  questionsService: QuestionsService;
}

export const QuestionsContext = React.createContext<
  Partial<QuestionsContextValue>
>({
  questions: [],
  loaded: false,
});

const QuestionsProvider: FunctionComponent<QuestionsProviderProps> = ({
  children,
  roomId,
}) => {
  const firebaseService = useContext(FirebaseContext);
  const { authService } = useAuth();
  const [loaded, setLoaded] = useState<boolean>(false);

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const questionsService = useMemo(
    () => new QuestionsService(firebaseService, authService, roomId),
    [firebaseService, authService, roomId]
  );
  useEffect(() => {
    return firebaseService.db
      .collection("rooms")
      .doc(roomId)
      .collection("questions")
      .onSnapshot((qs) => {
        const questions = qs.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as IQuestionRecord),
          createdAt: doc.data().createdAt.toDate(),
        }));
        setQuestions(questions);
        setLoaded(true);
      });
  }, [firebaseService, roomId]);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        loaded,
        questionsService,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
