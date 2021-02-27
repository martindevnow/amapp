import styled, { css } from "styled-components";
import { themeGet } from "../../../styles/theme";

interface ButtonProps {
  variant?: "primary" | "secondary";
}

const primaryButtonStyles = css`
  background-color: ${themeGet("colors.primary")};
  color: white;
`;

const secondaryButtonStyles = css`
  background-color: ${themeGet("colors.secondary")};
  color: black;
`;

const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border: 1px solid lightgray;
  border-radius: 4px;
  cursor: pointer;
  transition: all 90ms;

  ${(props) => props.variant === "primary" && primaryButtonStyles}
  ${(props) => props.variant === "secondary" && secondaryButtonStyles}

  :hover:enabled {
    box-shadow: ${themeGet("boxShadow.navbar")};
    transform: scale(1.05);
  }
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
  ${secondaryButtonStyles}
`;

export const ButtonDark = styled(Button)`
  ${primaryButtonStyles}
`;

export default Button;
