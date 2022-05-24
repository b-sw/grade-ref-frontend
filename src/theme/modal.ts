const defaultModalVariant = (_props: any) => {
  return {
    dialog: {
      bg: 'gray.300',
    }
  }
}

export const Modal = {
  variants: {
    defaultModal: defaultModalVariant
  },
  defaultProps: {
    variant: 'defaultModal',
  }
};