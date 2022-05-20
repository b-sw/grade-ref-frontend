import {Button, Flex, Spacer, Text, useDisclosure} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import {ObserverAddModal} from "./ObserverAddModal";
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {User} from "../../../entities/User";
import {ObserverListItem} from "./ObserverListItem";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";

export const ObserversPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { leagueUsersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  return (
    <>
      <ObserverAddModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
      <Flex
        direction={'column'}
        borderRadius={10}
        p={5}
        backgroundColor={'gray.300'}
        shadow={'md'}
        overflowY={'hidden'}
        flexGrow={1}
        h={'50%'}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Observers
          </Text>
          <Spacer />
          <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
            Add
          </Button>
        </Flex>

        <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
          {observersQuery.data &&
            observersQuery.data.map((observer: User) =>
              <ObserverListItem key={observer.id} observer={observer} />
            )}
        </Flex>
      </Flex>
    </>
  );
}