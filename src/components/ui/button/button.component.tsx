import styled from "styled-components";

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid lightgray;
  cursor: pointer;
`;

export const IconButton = styled.button`
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  min-width: 3rem;
  height: 3rem;
  margin: 0.2rem;
  background: none;
  border-radius: 10px;
  :hover {
    background-color: #eee;
    & svg {
      fill: #555;
    }
  }
  :disabled {
    cursor: not-allowed;
  }
`;

export const ButtonLight = styled(Button)`
  width: 7rem;
  background-color: #dddddd;
  color: black;
  font-size: 1rem;
  padding: 1rem;
  border-radius: 8px;
`;

export const ButtonDark = styled(Button)`
  background-color: #222222;
  color: white;
`;

export default Button;
