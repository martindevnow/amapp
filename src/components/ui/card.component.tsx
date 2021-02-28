import styled from "styled-components";
import themeGet from "../../styles/themeGet";

type CardProps = { invisible?: boolean };

const Card = styled.div<CardProps>`
  padding: 24px;
  border-radius: ${themeGet("border", "radius")};
  border: ${({ theme, invisible }) =>
    invisible ? "none" : theme.border.light};
  box-shadow: ${({ theme, invisible }) =>
    invisible ? "none" : theme.boxShadow.navbar};
`;

export default Card;
