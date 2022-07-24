import { Flex, FlexProps, Spacer, Text } from '@chakra-ui/react';

interface DropzoneProps {
  text: string;
  textColor?: string;
  opacity?: number;
  children?: (JSX.Element | false)[] | (JSX.Element | false);
  flexProps?: FlexProps;
}

export const Dropzone = ({ text, textColor, opacity, children, flexProps}: DropzoneProps) => {
  return (
    <Flex
      w={'100%'}
      h={'100%'}
      direction={'column'}
      backgroundColor={'gray.100'}
      p={5}
      align={'center'}
      borderRadius={10}
      borderWidth={2}
      borderColor={'gray.400'}
      {...flexProps}
      position={'relative'}
    >
      <Spacer />

      {children}

      <Text opacity={opacity ?? 1} color={textColor ?? 'default'}>{text}</Text>

      <Spacer />
    </Flex>
  );
}