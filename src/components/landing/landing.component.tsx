import React from "react";
import styled from "styled-components";
import JoinRoom from "../join-room/join-room.component";
import Can from "../../hoc/can.component";
import { AclActions } from "../../services/auth/auth.acl";
import CreateRoom from "../create-room/create-room.component";
import { LGHeader, MDHeader } from "../ui/header/header.component";
import Column from "../ui/layout/column.component";
import Card from "../ui/card/card.component";

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const Header = styled(LGHeader)`
  margin-top: 110px;
  text-align: left;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  margin-top: 50px;

  ${Card} {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const LandingPage = () => {
  return (
    <>
      <Header>Ask Me Anything</Header>
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

      <Flex>
        <Column>
          <Card>
            <MDHeader>Have a Room ID?</MDHeader>
            <JoinRoom />
          </Card>
        </Column>
        <Can aclAction={AclActions.CREATE_ROOM}>
          <Column>
            <Card>
              <MDHeader>Create a new Room </MDHeader>
              <CreateRoom />
            </Card>
          </Column>
        </Can>
      </Flex>
    </>
  );
};

export default LandingPage;
