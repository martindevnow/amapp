/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { FunctionComponent, useCallback, useState } from "react";

interface ToastProps {
  show: boolean;
}

const Toast: FunctionComponent<ToastProps> = ({ show, children }) => (
  <div
    css={css`
      visibility: ${show ? "visible" : "hidden"};
      position: fixed;
      top: 0;
      right: 3rem;
      background-color: orange;
      padding: 1rem 3rem;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      opacity: ${show ? "100%" : "0%"};
      transition: opacity 0.3s ease-in-out;
    `}
  >
    {children}
  </div>
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
