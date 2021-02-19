import React, { FunctionComponent, useCallback, useState } from "react";
import styled from "styled-components";

interface ToastProps {
  show: boolean;
}

const StyledToast = styled.div<{ show: boolean }>`
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: orange;
  padding: 1rem 3rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  opacity: ${({ show }) => (show ? "100%" : "0%")};
  transition: opacity 0.3s ease-in-out;
`;

const Toast: FunctionComponent<ToastProps> = ({ show, children }) => (
  <StyledToast show={show}>{children}</StyledToast>
);

export const useToast = (autoDismissTimerMilliseconds: number) => {
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
