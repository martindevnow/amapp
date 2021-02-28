import styled from "styled-components";
import themeGet from "../../../styles/themeGet";

// TODO: Need to consider where this is appearing
// since this changes the font color, can we assume this is always how it should be handled?
// or are these cases where either:
// 1. change the font color to be visible on the background
// 2. add an optional background prop to show behind the text to make it visible anywhere

const InlineError = styled.span<{ show: boolean }>`
  display: ${({ show }) => (!show ? "none" : "block")};
  color: ${themeGet("colors", "error")};
  margin-bottom: 3px;
`;

export default InlineError;
