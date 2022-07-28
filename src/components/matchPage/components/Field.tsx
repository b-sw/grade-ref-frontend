import { Flex, Spacer, Text } from '@chakra-ui/react';

export interface FieldProps {
  name: string;
  element: JSX.Element;
}

export const Field = ({ name, element }: FieldProps) => {
  return (
    <Flex gap={5}>
      <Flex w={'50%'} align={'center'}>
        <Spacer />
        <Text fontSize={'xl'}>{name}</Text>
      </Flex>
      <Flex w={'50%'}>
        {element}
        <Spacer />
      </Flex>
    </Flex>
  );
};
