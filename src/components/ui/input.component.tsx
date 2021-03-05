import styled from "styled-components";
import themeGet from "../../styles/themeGet";

interface InputProps {
  readonly bleed?: boolean;
}

const Input = styled.input<InputProps>`
  display: block;
  border: ${themeGet("border", "normal")};
  border-radius: ${themeGet("border", "radius")};
  padding: 0.5rem 1rem;
  width: ${({ bleed }) => (bleed ? "100%" : "15rem")};
  margin-bottom: 18px;
  background: ${themeGet("colors", "background")};
  color: ${themeGet("colors", "text")};

  :hover {
    box-shadow: ${themeGet("boxShadow", "navbar")};
  }
`;

export default Input;
