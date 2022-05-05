import {Box, Button, Divider, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {scrollbarStyle} from "../../dashboard/shared/styles";
import { useUsers } from '../../../hooks/useUsers';
import {User} from "../../../entities/User";
import { RefereeListItem } from './RefereeListItem';
import { RefereeCreateModal } from './RefereeCreateModal';

export const RefereesPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { refereesQuery } = useUsers();

  return (
    <>
      <RefereeCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
      <Flex
        direction={'column'}
        borderRadius={10}
        backgroundColor={'gray.750'}
        p={7}
        shadow={'dark-lg'}
        overflowY={'hidden'}
        flexGrow={1}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Referees
          </Text>
          <Spacer />
          <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
            Add
          </Button>
        </Flex>

        <Box overflowY={'scroll'} css={scrollbarStyle}>
          {refereesQuery.data &&
            refereesQuery.data.map((referee: User, i: number) => (
              <div key={referee.id}>
                <RefereeListItem referee={referee} />
                {i < refereesQuery.data.length - 1 && <Divider />}
              </div>
            ))}
        </Box>
      </Flex>
    </>
  );
}