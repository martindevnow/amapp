import styled, { css } from "styled-components";
import { media, themeGet } from "../../../styles/theme";

const Layout = styled.div`
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

export default Layout;
