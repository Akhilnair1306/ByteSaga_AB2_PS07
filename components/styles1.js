import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const colors = {
  primary: '#FF7B92', // Soft pink from the image
  secondary: '#9B87F5', // Purple from the image
  accent: '#4CE1E6', // Turquoise accent
  background: '#F0F5FF', // Light blue background
  white: '#FFFFFF',
  dark: '#2E384D', // Dark text color
  grey: '#8A94A6', // Subtitle text color
  lightGrey: '#EEF2F9', // Light grey for borders
};
export const typography = {
  heading: {
    fontFamily: 'System', // Replace with your custom font if available
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: colors.dark,
  },
  subheading: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.grey,
  },
  button: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  caption: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '400',
    color: colors.grey,
  },
};
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
export const layout = {
  screenWidth: width,
  screenHeight: height,
  borderRadius: {
    small: 8,
    medium: 16,
    large: 24,
    full: 9999,
  },
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};
export const buttons = {
  primary: {
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    ...layout.shadow.small,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderRadius: layout.borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  text: {
    color: colors.primary,
    ...typography.button,
    fontWeight: '500',
  },
};
export const containers = {
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.large,
    padding: spacing.xl,
    ...layout.shadow.medium,
  },
};
export const animations = {
  transition: {
    fade: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slide: {
      from: { translateY: 20 },
      to: { translateY: 0 },
    },
  },
  timing: {
    fast: 300,
    normal: 500,
    slow: 700,
  },
};