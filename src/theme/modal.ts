const defaultModalVariant = () => {
  return {
    dialog: {
      bg: 'gray.300',
    },
  };
};

export const Modal = {
  variants: {
    defaultModal: defaultModalVariant,
  },
  defaultProps: {
    variant: 'defaultModal',
  },
};
