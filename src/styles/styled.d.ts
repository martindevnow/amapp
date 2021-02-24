// import original module declarations
import "styled-components";
import {} from "styled-components/cssprop";

type Breakpoint = "sm" | "md" | "lg" | "xl";

type ByBreakpoint<T> = {
  [key in Breakpoint]: T;
};

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: ByBreakpoint<string>;
    layout: {
      maxWidth: string;
      padding: ByBreakpoint<string>;
    };
    colors: {
      primary: string;
      secondary: string;
      background: string;
    };
  }
}
