import styled from "styled-components";
import NavigationItem from "./navigation-item.component";

const NavigationList = styled.ul`
  display: flex;
  flex-direction: row;

  & ${NavigationItem} {
    list-style: none;
    padding: 0 0.5rem;
    text-align: center;
    display: flex;
    justify-content: center;
    & > a {
      text-decoration: none;

      &:hover {
        color: darken(darkblue, 50%);
        transform: translateY(-2px);
      }
    }
  }
`;

export default NavigationList;
