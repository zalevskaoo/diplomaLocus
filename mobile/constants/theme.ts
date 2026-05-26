/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
export const LOCUS_COLORS = {
  darkBlue: '#233449',
  blueGray: '#A9BBBD',
  beige: '#E1CCAD',
  cream: '#E8E5DA',
  brown: '#855B52',
  rose: '#9D6F86',
  gray: '#636563',

  background: '#E8E5DA',
  surface: '#F5F0E6',
  primary: '#233449',
  secondary: '#855B52',
  accent: '#9D6F86',
  muted: '#A9BBBD',
  text: '#233449',
  textLight: '#E8E5DA',
  border: '#CDBFAF',
  danger: '#855B52',
  success: '#A9BBBD',
};

export const LOCUS_RADIUS = {
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

export const LOCUS_SHADOW = {
  shadowColor: '#233449',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.12,
  shadowRadius: 14,
  elevation: 4,
};


export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
