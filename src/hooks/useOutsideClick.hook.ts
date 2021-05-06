import React from "react";

const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: Function
) => {
  const handleClick = React.useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback(e);
      }
    },
    [ref, callback]
  );

  React.useEffect(() => {
    console.log("adding click listener for  useOutsideClick");
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
};

export default useOutsideClick;
