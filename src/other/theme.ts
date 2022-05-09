// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

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
  }
}

// 3. extend the theme
const theme = extendTheme({ config, colors });

export default theme;
