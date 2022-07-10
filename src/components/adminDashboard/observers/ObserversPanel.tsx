import {Button, Flex, Input, InputGroup, InputLeftElement, Spacer, Text, useDisclosure} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import {ObserverAddModal} from "./ObserverAddModal";
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {User} from "entities/User";
import {ObserverListItem} from "./ObserverListItem";
import {useLeagueUsers} from "hooks/useLeagueUsers";
import {Role} from "utils/Role";
import { MdSearch } from 'react-icons/md';
import {useSetState} from "hooks/useSetState";
import {userFilter} from "../../shared/filters";
import { useEffect } from 'react';
import {noRecords} from "../../shared/panelUtils";

interface State {
  observers: User[],
  filter: string,
}

export const ObserversPanel = () => {
  const {isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  const [state, setState] = useSetState({
    observers: [],
    filter: '',
  } as State);

  useEffect(() => {
    const filteredObservers: User[] = userFilter(observersQuery.data!, state.filter);
    setState({ observers: filteredObservers });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filter, observersQuery.data]);

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
        w={['auto', '50%']}
        h={['auto', '100%']}
        maxH={['90vh', '100%']}
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

        <InputGroup>
          <InputLeftElement
            pointerEvents={'none'}
            children={<MdSearch />}
          />
          <Input
            mb={2}
            placeholder={'Search observer'}
            onChange={(event) => setState({ filter: event.target.value })}
          />
        </InputGroup>

        <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
          {state.observers.length ?
            state.observers.map((observer: User) =>
              <ObserverListItem key={observer.id} observer={observer} />)
            :
            noRecords()
          }
        </Flex>
      </Flex>
    </>
  );
}