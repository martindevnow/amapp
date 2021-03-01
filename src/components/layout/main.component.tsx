import styled from "styled-components";
import themeGet from "../../styles/themeGet";

const Main = styled.main`
  max-width: ${themeGet("layout", "maxWidth")};
  margin: 0 auto;
  flex: 1 1 auto;
`;

export default Main;
