import React, { useCallback, useState } from "react";
import styled from "styled-components";
import themeGet from "../styles/themeGet";

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
  bottom: 20px;
  padding: 1rem 3rem;
  opacity: ${({ show }) => (show ? "100%" : "0%")};
  transition: opacity 0.3s ease-in-out;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;

const Toast: React.FC<ToastProps> = ({ show, children }) => (
  <StyledToast show={show}>{children}</StyledToast>
);

const useToast = (autoDismissTimerMilliseconds: number) => {
  const [isToastActive, setIsToastActive] = useState(false);
  const displayToast = useCallback(() => {
    setIsToastActive(true);
    if (autoDismissTimerMilliseconds > 0) {
      setTimeout(() => {
        setIsToastActive(false);
      }, autoDismissTimerMilliseconds);
    }
  }, [autoDismissTimerMilliseconds]);

  return { isToastActive, displayToast, Toast };
};

export default useToast;
