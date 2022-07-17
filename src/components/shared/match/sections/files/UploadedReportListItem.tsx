import { Flex, Spacer, Text } from '@chakra-ui/react';
import { AiOutlineFile, AiOutlineFileDone } from 'react-icons/ai';

export const UploadedReportListItem = () => {
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
      <AiOutlineFileDone opacity={0.6} size={'40'} color={'black'} />
      <Text opacity={0.8}>Uploaded</Text>
      <Spacer />
    </Flex>
  );
};
