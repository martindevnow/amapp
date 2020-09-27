import styled from "@emotion/styled";

const Button = styled("button")`
  padding: 0.5rem 1rem;
  border: 1px solid lightgray;
  cursor: pointer;
`;

export const IconButton = styled("button")`
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: none;
`;

export default Button;
