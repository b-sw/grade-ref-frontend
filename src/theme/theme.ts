// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';
import { Input } from "./input";
import { Modal } from './modal';

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
  lime: {
    50: '#f2ffde',
    100: '#defcb2',
    200: '#caf884',
    300: '#b5f554',
    400: '#a1f226',
    500: '#88d90d',
    600: '#69a905',
    700: '#4a7801',
    800: '#2b4800',
    900: '#0b1900',
  }
}

const components = {
  Input,
  Modal,
}

// 3. extend the theme
const theme = extendTheme({ colors, components, config });

export default theme;
