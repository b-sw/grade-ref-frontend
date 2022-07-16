import { Flex, Text } from '@chakra-ui/react';

export const EmptyReportListItem = () => {
  return (
    <Flex
      w={'100%'}
      direction={'column'}
      backgroundColor={'gray.100'}
      p={5}
      borderRadius={10}
      borderWidth={2}
      borderColor={'gray.400'}
      h={'100%'}
      align={'center'}
      position={'relative'}
    >
      <Text>Empty</Text>
    </Flex>
  );
};
