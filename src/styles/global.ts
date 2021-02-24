import { normalize } from "polished";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${normalize()}
  body {
    background-color: ${(props) => props.theme.colors.background};
  }
`;
