import React from "react";

const useToast = (autoDismissTimerMilliseconds: number) => {
  const [isToastActive, setIsToastActive] = React.useState(false);
  const displayToast = React.useCallback(() => {
    setIsToastActive(true);
    if (autoDismissTimerMilliseconds > 0) {
      setTimeout(() => {
        setIsToastActive(false);
      }, autoDismissTimerMilliseconds);
    }
  }, [autoDismissTimerMilliseconds]);

  return { isToastActive, displayToast };
};

export default useToast;
