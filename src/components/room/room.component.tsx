import React, { useContext, FunctionComponent } from "react";
import { useParams } from "react-router-dom";

import { IRoom, RoomMap } from "../../services/rooms/rooms.types";
import QuestionFeed from "../question-feed/question-feed.component";
import AddQuestion from "../add-question/add-question.component";
import QuestionsProvider from "../../services/questions/questions.provider";
import { RoomsContext } from "../../services/rooms/rooms.provider";
import Loading from "../loading/loading.component";

interface RoomProps {
  room: IRoom;
}

const Room: FunctionComponent<RoomProps> = ({ room }) => {
  return (
    <QuestionsProvider roomId={room.id}>
      <h1>Welcome to {room.name}</h1>
      <QuestionFeed roomId={room.id} />
      <h2>Ask a question: </h2>
      <AddQuestion roomId={room.id} />
    </QuestionsProvider>
  );
};

const RoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { rooms, loaded } = useContext(RoomsContext);
  return loaded ? <Room room={(rooms as RoomMap)[roomId]} /> : <Loading />;
};

export default RoomPage;