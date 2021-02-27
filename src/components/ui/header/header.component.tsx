import styled, { css } from "styled-components";
import { themeGet } from "../../../styles/theme";

const commonHeaderStyles = css`
  font-family: ${themeGet("fonts.heading")};
  font-weight: ${themeGet("fontWeight.bold")};
  letter-spacing: 0;
`;

export const xxlHeaderSize = css`
  font-size: ${themeGet("fontSizes.heading.xxl")};
  margin-bottom: 1em;
  line-height: 1.1;
`;

export const xlHeaderSize = css`
  font-size: ${themeGet("fontSizes.heading.xl")};
  margin-bottom: 1em;
  line-height: 1.1;
`;

export const lgHeaderSize = css`
  font-size: ${themeGet("fontSizes.heading.lg")};
  margin-bottom: 1em;
  line-height: 1.1;
`;

export const mdHeaderSize = css`
  font-size: ${themeGet("fontSizes.heading.md")};
  margin-bottom: 1em;
  line-height: 1.1;
`;

export const smHeaderSize = css`
  font-size: ${themeGet("fontSizes.heading.sm")};
  margin-bottom: 1em;
  line-height: 1.1;
`;

export const XXLHeader = styled.h1`
  ${commonHeaderStyles}
  ${xxlHeaderSize}
`;

export const XLHeader = styled.h1`
  ${commonHeaderStyles}
  ${xlHeaderSize}
`;

export const LGHeader = styled.h2`
  ${commonHeaderStyles}
  ${lgHeaderSize}
`;

export const MDHeader = styled.h3`
  ${commonHeaderStyles}
  ${mdHeaderSize}
`;

export const SMHeader = styled.h3`
  ${commonHeaderStyles}
  ${smHeaderSize}
`;
