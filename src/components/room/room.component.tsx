/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useContext, FunctionComponent } from "react";
import { useParams, withRouter, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { IRoom, RoomMap } from "../../services/rooms/rooms.types";
import QuestionFeed from "../question-feed/question-feed.component";
import AddQuestion from "../add-question/add-question.component";
import QuestionsProvider, {
  QuestionsContext,
} from "../../services/questions/questions.provider";
import { RoomsContext } from "../../services/rooms/rooms.provider";
import Loading from "../loading/loading.component";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";
import Question from "../question/question.component";
import Button from "../ui/button/button.component";
import Answer from "../answer/answer.component";
import { useAuth } from "../../services/auth/auth.provider";

interface RoomProps {
  room: IRoom;
}

const Room: FunctionComponent<RoomProps> = ({ room }) => {
  const { questions, questionsService } = useContext(QuestionsContext);
  const activeQuestion = questions?.find((q) => q.id === room.activeQuestionId);
  const clearActiveQuestion = async () => {
    await questionsService?.clearActiveQuestion();
  };

  return (
    room && (
      <React.Fragment>
        <h1>Welcome to {room.name}</h1>
        <div
          className="upper"
          css={css`
            display: flex;
            justify-content: space-evenly;
            flex-direction: column;
            column-gap: 4rem;

            @media (min-width: 1020px) {
              flex-direction: row;
            }
          `}
        >
          <Can aclAction={AclActions.ASK_QUESTION}>
            <div className="left">
              <h2>Ask a question: </h2>
              <AddQuestion />
            </div>
          </Can>

          {room.activeQuestionId && activeQuestion && (
            <div className="right">
              <span
                css={css`
                  margin-right: 1rem;
                `}
              >
                {" "}
                Current Question:
              </span>
              <Can aclAction={AclActions.CLEAR_ACTIVE_QUESTION}>
                <Button onClick={clearActiveQuestion}>Clear</Button>
              </Can>
              <Question question={activeQuestion} />
              <Can aclAction={AclActions.ANSWER_QUESTION}>
                <Answer question={activeQuestion} />
              </Can>
            </div>
          )}
        </div>
        <QuestionFeed roomId={room.id} />
      </React.Fragment>
    )
  );
};

const RoomPage = ({ location }: any) => {
  const { roomId } = useParams<{ roomId: string }>();
  const { rooms, loaded } = useContext(RoomsContext);
  const { user, loaded: userLoaded } = useAuth();
  const history = useHistory();

  React.useEffect(() => {
    if (userLoaded && !user) {
      history.push(ROUTES.SIGN_IN, { prevPage: location });
    }
  }, [history, user, userLoaded, location]);

  return loaded ? (
    <QuestionsProvider roomId={roomId}>
      <Room room={(rooms as RoomMap)[roomId]} />
    </QuestionsProvider>
  ) : (
    <Loading />
  );
};

export default withRouter(RoomPage);
