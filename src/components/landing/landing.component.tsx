import React from "react";
import JoinRoom from "../join-room/join-room.component";

const LandingPage = () => {
  return (
    <>
      <h1>Welcome to the AMA App (AMApp)</h1>
      <p>
        This app serves as a tool for audiences to ask questions of speakers at
        events. Everyone in the audience is invited to join the room with the ID
        shared by the speaker.
      </p>
      <p>
        The audience can then submit their own questions, or vote for questions
        they would like to have answered. These questions can be submitted
        anonymously. (Spam and inappropriate messages will still be punished.)
      </p>
      <p>
        The speaker will then (hopefully) answer the questions which have the
        most votes.
      </p>
      <p>
        Once the question has been answered, it can be marked as such by the
        speaker or moderator to hide is from view so the discussion can move to
        the next question.
      </p>

      <h2>Have a Room ID?</h2>
      <JoinRoom />
    </>
  );
};

export default LandingPage;
