import { normalize } from "polished";
import { createGlobalStyle } from "styled-components";
import themeGet from "./themeGet";

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  body {
    background-color: ${themeGet("colors", "background")};
    color: ${themeGet("colors", "text")};
  }
`;

export default GlobalStyle;
