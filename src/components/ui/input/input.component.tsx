import styled from "styled-components";

interface InputProps {
  readonly bleed?: boolean;
}

const Input = styled.input<InputProps>`
  border: 1px solid lightgray;
  padding: 0.5rem 1rem;
  width: ${({ bleed }) => (bleed ? "100%" : "15rem")};
`;

export default Input;
