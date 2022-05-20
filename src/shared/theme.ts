// theme.js

// 1. import `extendTheme` function
import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  customButton: {
    50: '#CBD5E0',
    100: '#E2E8F0',
    600: '#1A202C',
  },
  brand: baseTheme.colors.red,
}

const Input = {
  parts: ['field'],
  baseStyle: {
    field: {
      // color: 'blue.400'
    }
  },
  defaultProps: {
    variant: 'filled',
    type: 'search',
  }
};

const components = {
  Input,
}

// 3. extend the theme
const theme = extendTheme({ components, config, colors });

export default theme;
