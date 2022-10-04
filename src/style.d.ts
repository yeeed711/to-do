import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor: string;
    cardColor: string;
    cardBgColor: string;
    redColor: string;
    redBgColor: string;
  }
}
