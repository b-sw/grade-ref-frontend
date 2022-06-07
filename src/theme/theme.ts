// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';
import { Input } from "./input";
import { Modal } from './modal';
import { Select } from './select';
import {NumberInput} from "./numberInput";

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  explorerButton: {
    50: '#CBD5E0',
    100: '#E2E8F0',
    600: '#1A202C',
  },
}

const components = {
  Input,
  NumberInput,
  Modal,
  Select,
}

// 3. extend the theme
const theme = extendTheme({ colors, components, config });

export default theme;
