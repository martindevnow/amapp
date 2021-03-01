import React from "react";
import styled from "styled-components";

import themeGet from "../styles/themeGet";

const FooterContainer = styled.footer`
  max-width: ${themeGet("layout", "maxWidth")};
  min-height: 50px;
  flex: 0 1 100px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
  padding-bottom: 20px;
`;

const Left = styled.div``;

const Right = styled.div``;

const SourceLink = styled.a`
  text-decoration: none;
  color: ${themeGet("colors", "primary")};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Left>
        <SourceLink
          target="_blank"
          href="https://github.com/martindevnow/amapp"
        >
          Source
        </SourceLink>
      </Left>
      <Right>&copy; 2021 Benjamin Martin</Right>
    </FooterContainer>
  );
};

export default Footer;
