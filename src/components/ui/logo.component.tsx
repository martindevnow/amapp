import { Link } from "react-router-dom";
import styled from "styled-components";
import themeGet from "../../styles/themeGet";
import { mdHeaderSize } from "./header.component";

const Logo = styled(Link)`
  ${mdHeaderSize}
  font-weight: ${themeGet("fontWeight", "bold")};
  margin: 0;
  text-decoration: none;
  transition: color 0.3s ease;

  :visited,
  :active {
    color: inherit;
  }

  :hover,
  :focus {
    color: ${themeGet("colors", "primary")};
  }
`;

export default Logo;
