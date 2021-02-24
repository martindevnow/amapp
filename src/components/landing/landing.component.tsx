import React from "react";
import styled from "styled-components";
import JoinRoom from "../join-room/join-room.component";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";
import CreateRoom from "../create-room/create-room.component";

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const LandingPage = () => {
  return (
    <div>
      <h1>Ask Me Anything</h1>
      <Paragraph>
        In 2009, the sub-reddit <code>r/IAmA</code> was founded on the premise
        of Asking Me Anything (about a topic or whatnot). Since then, the AMA
        format has gone on to take the world by storm.
      </Paragraph>
      <Paragraph>
        Join the room for your AMA and submit questions to the speaker. Be sure
        to see if someone else has already asked your question. You'll have more
        success "up-voting" their question to gain visibility.
      </Paragraph>
      <Paragraph>
        The speaker will then typically answer the questions which have the most
        votes. Answered questions can be filtered out to show only outstanding
        questions of the speaker.
      </Paragraph>

      <h2>Have a Room ID?</h2>
      <JoinRoom />
      <Can aclAction={AclActions.CREATE_ROOM}>
        <h2>Create a new Room </h2>
        <CreateRoom />
      </Can>
    </div>
  );
};

export default LandingPage;
