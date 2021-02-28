import { css, DefaultTheme } from "styled-components";
import { Breakpoint } from "./styled";
import themeGet from "./themeGet";

const theme: DefaultTheme = {
  border: {
    radius: "4px",
    light: "1px solid rgb(17 31 93 / 5%)",
    normal: "1px solid rgb(17 31 93 / 15%)",
  },
  boxShadow: {
    navbar: "rgb(17 31 93 / 5%) 3px 0px 30px, rgb(27 27 43 / 9%) 2px 0px 5px",
  },
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
  },
  fonts: {
    heading: "Inconsolata",
    copy: "Roboto",
  },
  fontSizes: {
    heading: {
      xxl: "130px",
      xl: "98px",
      lg: "50px",
      md: "30px",
      sm: "18px",
    },
    copy: {
      xxl: "60px",
      xl: "40px",
      lg: "30px",
      md: "20px",
      sm: "14px",
    },
  },
  fontWeight: {
    light: "300",
    normal: "400",
    bold: "700",
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
    primary: "rgb(232 75 78)",
    onPrimary: "white",
    secondary: "#fcfcfc",
    onSecondary: "black",
    background: "white",
    text: "black",
    success: "green",
    warning: "yellow",
    error: "#ff0022",
  },
};

export const media = (breakpoint: Breakpoint) => (mediaCss: any) => css`
  @media all and (max-width: ${themeGet("breakpoints", breakpoint)}) {
    ${mediaCss}
  }
`;

export default theme;
