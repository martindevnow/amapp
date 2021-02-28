import { DefaultTheme } from "styled-components";

type Props = { theme: DefaultTheme };

function themeGet<P1 extends keyof NonNullable<DefaultTheme>>(
  prop1: P1
): ({ theme }: Props) => NonNullable<DefaultTheme>[P1] | undefined;

function themeGet<
  P1 extends keyof NonNullable<DefaultTheme>,
  P2 extends keyof NonNullable<NonNullable<DefaultTheme>[P1]>
>(
  prop1: P1,
  prop2: P2
): ({
  theme,
}: Props) => NonNullable<NonNullable<DefaultTheme>[P1]>[P2] | undefined;

function themeGet<
  P1 extends keyof NonNullable<DefaultTheme>,
  P2 extends keyof NonNullable<NonNullable<DefaultTheme>[P1]>,
  P3 extends keyof NonNullable<NonNullable<NonNullable<DefaultTheme>[P1]>[P2]>
>(
  prop1: P1,
  prop2: P2,
  prop3: P3
): ({
  theme,
}: Props) =>
  | NonNullable<NonNullable<NonNullable<DefaultTheme>[P1]>[P2]>[P3]
  | undefined;

// ...and so on...

function themeGet(...props: string[]): any {
  return ({ theme }: any) =>
    theme &&
    props.reduce(
      (result, prop) => (result == null ? undefined : result[prop]),
      theme
    );
}

export default themeGet;
