import React from "react";

export default function useToggle(
  initialValue = false
): Readonly<[boolean, () => void]> {
  const [value, setValue] = React.useState(initialValue);

  const toggle = React.useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle] as const;
}
