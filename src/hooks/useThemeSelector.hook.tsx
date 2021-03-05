import React from "react";
import { ThemeContext } from "../services/theme/theme.provider";

export const useThemeSelector = () => React.useContext(ThemeContext);
