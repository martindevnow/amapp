import styled from "styled-components";

const InlineError = styled.span<{ show: boolean }>`
  display: ${({ show }) => (!show ? "none" : "block")};
  color: red;
  margin-bottom: 3px;
`;

export default InlineError;
