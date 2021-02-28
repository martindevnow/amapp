import React from "react";
// NOTE: This uses @emotion, not style-components
// TODO: Consider alternative, or home-baked
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useTheme } from "styled-components";

const Loading = () => {
  const theme = useTheme();
  return <ClimbingBoxLoader color={theme.colors.primary} size={20} />;
};

export default Loading;
