const defaultSelectVariant = () => {
  return {
    field: {
      background: 'gray.100',
      color: 'gray.900',
      _hover: {
        background: 'gray.200',
      },
      _focus: {
        background: 'gray.50',
      },
    },
  };
};

export const Select = {
  variants: {
    defaultSelect: defaultSelectVariant,
  },
  defaultProps: {
    variant: 'defaultSelect',
  },
};
