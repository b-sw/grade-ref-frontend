import { Flex } from '@chakra-ui/react';

interface SectionBodyProps {
  children: JSX.Element;
}

export const SectionBody = ({ children }: SectionBodyProps) => {
  return (
    <Flex direction={'column'} w={'100%'} borderRadius={10} backgroundColor={'gray.200'} p={5} overflow={'hidden'}>
      {children}
    </Flex>
  );
};
