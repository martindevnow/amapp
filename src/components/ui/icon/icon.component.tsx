import { FunctionComponent } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}
export interface IconComponent extends FunctionComponent<IconProps> {}
