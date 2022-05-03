import { Flex, Text } from '@chakra-ui/react';

export const AdminSettingsPanel = () => {

  return (
    <Flex
      direction={'column'}
      borderRadius={10}
      backgroundColor={'gray.750'}
      p={7}
      shadow={'dark-lg'}
      overflowY={'hidden'}
    >
      <Flex mb={4}>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          Settings
        </Text>
      </Flex>

    </Flex>
  );
};
