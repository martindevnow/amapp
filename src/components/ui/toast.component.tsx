import React from "react";
import styled from "styled-components";

import themeGet from "../../styles/themeGet";

interface ToastProps {
  show: boolean;
}

const StyledToast = styled.div<{ show: boolean }>`
  border: 1px solid ${themeGet("colors", "primary")};
  border-radius: ${themeGet("border", "radius")};
  box-shadow: ${themeGet("boxShadow", "navbar")};
  color: ${themeGet("colors", "primary")};
  background-color: ${themeGet("colors", "background")};
  position: fixed;
  right: 20px;
  top: calc(20px + ${themeGet("layout", "navigation", "height")});
  padding: 1rem 3rem;
  opacity: ${({ show }) => (show ? "100%" : "0%")};
  transition: opacity 0.3s ease-in-out;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;

const Toast: React.FC<ToastProps> = ({ show, children }) => (
  <StyledToast show={show}>{children}</StyledToast>
);

export default Toast;
