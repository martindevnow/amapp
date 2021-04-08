import styled from "styled-components";
import themeGet from "../../styles/themeGet";

interface InlineAnchorProps {
  stealth?: boolean;
}

const InlineAnchor = styled.a<InlineAnchorProps>`
  color: ${({ theme, stealth }) =>
    stealth
      ? themeGet("colors", "text")({ theme })
      : themeGet("colors", "primary")({ theme })};
  cursor: pointer;
  transition: filter 150ms;
  &:hover {
    filter: brightness(90%);
  }
`;

export default InlineAnchor;
