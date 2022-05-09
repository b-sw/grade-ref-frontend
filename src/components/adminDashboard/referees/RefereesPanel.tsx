import {Button, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
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
        p={5}
        backgroundColor={'gray.300'}
        shadow={'md'}
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

        <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
          {refereesQuery.data &&
            refereesQuery.data.map((referee: User) =>
              <RefereeListItem key={referee.id} referee={referee} />
            )}
        </Flex>
      </Flex>
    </>
  );
}