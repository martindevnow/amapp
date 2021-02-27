import { Link } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "../../../styles/theme";
import { mdHeaderSize } from "../header/header.component";

const Logo = styled(Link)`
  ${mdHeaderSize}
  font-weight: ${themeGet("fontWeight.bold")};
  margin: 0;
  text-decoration: none;
  padding: 5px 11px;
  margin-left: -11px;
  border-radius: 17px;

  :visited,
  :active {
    color: inherit;
  }

  :hover {
    box-shadow: ${themeGet("boxShadow.navbar")};
  }
`;

export default Logo;
