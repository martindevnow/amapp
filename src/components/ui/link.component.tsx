import { Link as ReactLink } from "react-router-dom";
import styled from "styled-components";
import themeGet from "../../styles/themeGet";

const Link = styled(ReactLink)`
  color: ${themeGet("colors", "text")};

  :hover {
    color: ${themeGet("colors", "primary")};
  }
`;

export default Link;
