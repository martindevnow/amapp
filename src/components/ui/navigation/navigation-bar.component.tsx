import styled, { css } from "styled-components";
import { media } from "../../../styles/theme";
import themeGet from "../../../styles/themeGet";

const NavigationBar = styled.nav`
  border-bottom: 1px solid #eeeeee;
  box-shadow: ${themeGet("boxShadow", "navbar")};
  display: flex;
  min-height: ${themeGet("layout", "navigation", "height")};
  padding: 0 ${themeGet("layout", "padding", "xl")};

  ${media("lg")(css`
    padding: 0 ${themeGet("layout", "padding", "lg")};
  `)}

  ${media("md")(css`
    padding: 0 ${themeGet("layout", "padding", "md")};
  `)}

  ${media("sm")(css`
    padding: 0 ${themeGet("layout", "padding", "sm")};
  `)}
`;

export default NavigationBar;
