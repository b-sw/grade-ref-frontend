import {Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';

export const AdminSettingsPanel = () => {
  const { /*isOpen, */onOpen/*, onClose*/ } = useDisclosure();

  return (
    <Flex
      direction={'column'}
      borderRadius={10}
      p={5}
      backgroundColor={'gray.200'}
      shadow={'md'}
      overflowY={'hidden'}
    >
      <Flex mb={4}>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          Settings
        </Text>
      </Flex>

      <Box>
        <Button onClick={onOpen}>Delete league</Button>
      </Box>
    </Flex>
  );
};
