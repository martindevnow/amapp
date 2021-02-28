import styled from "styled-components";

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme?.layout?.maxWidth};
  margin: 0 auto;
`;

export default NavigationContainer;
