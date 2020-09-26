import { FunctionComponent } from "react";

interface IconProps {
  className?: string;
  style?: any;
  fill?: string;
}
export interface IconComponent extends FunctionComponent<IconProps> {}
