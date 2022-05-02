import { Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const AssignmentsPanel = () => {
  return (
    <Flex
      direction={'column'}
      borderRadius={10}
      // backgroundColor={'gray.750'}
      p={7}
      shadow={'dark-lg'}
      overflowY={'hidden'}
      flexGrow={10}
    >
      <Flex mb={4}>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          Grades assignments
        </Text>
        <Spacer />
        <Button variant={'ghost'} leftIcon={<AddIcon />}>
          Add
        </Button>
      </Flex>
    </Flex>
  );
};
