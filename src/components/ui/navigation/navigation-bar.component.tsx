import styled, { css } from "styled-components";
import { media, themeGet } from "../../../styles/theme";

const NavigationBar = styled.nav`
  background-color: #eeeeee;
  display: flex;
  min-height: 65px;
  padding: 0 ${themeGet("layout.padding.xl")};

  ${media("lg")(css`
    padding: 0 ${themeGet("layout.padding.lg")};
  `)}

  ${media("md")(css`
    padding: 0 ${themeGet("layout.padding.md")};
  `)}

  ${media("sm")(css`
    padding: 0 ${themeGet("layout.padding.sm")};
  `)}
`;

export default NavigationBar;
