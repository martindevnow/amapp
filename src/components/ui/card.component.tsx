import styled from "styled-components";

type CardProps = { invisible?: boolean };

const Card = styled.div<CardProps>`
  padding: 30px;
  border-radius: 4px;
  border: ${({ theme, invisible }) =>
    invisible ? "none" : theme.border.light};
  box-shadow: ${({ theme, invisible }) =>
    invisible ? "none" : theme.boxShadow.navbar};
`;

export default Card;
