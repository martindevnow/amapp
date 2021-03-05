import React from "react";
import styled from "styled-components";
import { useThemeSelector } from "../hooks/useThemeSelector.hook";
import { ReactComponent as SunIcon } from "../assets/fa/solid/sun.svg";
import { ReactComponent as MoonIcon } from "../assets/fa/solid/moon.svg";

import themeGet from "../styles/themeGet";
import { IconButton } from "./ui/button.component";

const FooterContainer = styled.footer`
  max-width: ${themeGet("layout", "maxWidth")};
  min-height: 80px;
  flex: 0 1 100px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 15px;
`;

const Left = styled.div``;

const Right = styled.div``;

const SourceLink = styled.a`
  text-decoration: none;
  color: ${themeGet("colors", "primary")};
`;

const Footer = () => {
  const { selectedTheme, toggle } = useThemeSelector();

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
      <Right>
        <IconButton onClick={() => toggle()} style={{ height: "unset" }}>
          {selectedTheme === "dark" ? (
            <SunIcon width="1.5rem" height="1.5rem" />
          ) : (
            <MoonIcon width="1.5rem" height="1.5rem" />
          )}
        </IconButton>
      </Right>
    </FooterContainer>
  );
};

export default Footer;
