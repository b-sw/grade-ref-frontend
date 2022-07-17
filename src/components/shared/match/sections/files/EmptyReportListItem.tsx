import { Flex, Spacer, Text } from '@chakra-ui/react';
import { AiOutlineFileUnknown } from 'react-icons/ai';

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
      <Spacer />
      <AiOutlineFileUnknown opacity={0.6} size={'40'} />
      <Text opacity={0.6}>Empty</Text>
      <Spacer />
    </Flex>
  );
};
