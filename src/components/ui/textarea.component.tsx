import styled from "styled-components";
import themeGet from "../../styles/themeGet";

interface TextareaProps {
  readonly bleed?: boolean;
}

const Textarea = styled.textarea<TextareaProps>`
  display: block;
  border: ${themeGet("border", "normal")};
  border-radius: ${themeGet("border", "radius")};
  padding: 0.5rem 1rem;
  width: ${({ bleed }) => (bleed ? "100%" : "15rem")};
  :hover {
    box-shadow: ${themeGet("boxShadow", "navbar")};
  }
  margin-bottom: 18px;
`;

export default Textarea;
