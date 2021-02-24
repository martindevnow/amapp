import { css, DefaultTheme } from "styled-components";
import { Breakpoint } from "./styled";

const theme: DefaultTheme = {
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
  },
  layout: {
    maxWidth: "936px",
    padding: {
      sm: "1rem",
      md: "2rem",
      lg: "3rem",
      xl: "4rem",
    },
  },
  colors: {
    primary: "#ff0022",
    secondary: "#fcfcfc",
    background: "white",
  },
};

export const themeGet = (accessor: string) => ({ theme }: any) =>
  accessor.split(".").reduce((acc, curr) => acc[curr] || null, theme);

export const media = (breakpoint: Breakpoint) => (mediaCss: any) => css`
  @media all and (max-width: ${themeGet(`breakpoints.${breakpoint}`)}) {
    ${mediaCss}
  }
`;

export default theme;
