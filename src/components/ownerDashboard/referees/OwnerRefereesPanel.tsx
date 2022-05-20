import {Button, Flex, Input, InputGroup, InputLeftElement, Spacer, Text, useDisclosure} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {User} from "../../../entities/User";
import {RefereeListItem} from './RefereeListItem';
import {RefereeCreateModal} from './RefereeCreateModal';
import {useUsers} from "../../../hooks/useUsers";
import { MdSearch } from 'react-icons/md';
import {useSetState} from "../../../hooks/useSetState";
import {userFilter} from "../../shared/filters";
import { useEffect } from 'react';

interface State {
  referees: User[],
  filter: string,
}

export const OwnerRefereesPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { refereesQuery } = useUsers();

  const [state, setState] = useSetState({
    referees: [],
    filter: '',
  } as State);

  useEffect(() => {
    setState({ referees: refereesQuery.data })
  }, [refereesQuery.data]);

  useEffect(() => {
    const filteredReferees: User[] = userFilter(refereesQuery.data!, state.filter);
    setState({ referees: filteredReferees });
  }, [state.filter]);

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

        <InputGroup>
          <InputLeftElement
            pointerEvents={'none'}
            children={<MdSearch />}
          />
          <Input
            mb={2}
            onChange={(event) => setState({ filter: event.target.value })}
          />
        </InputGroup>

        <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
          {state.referees &&
            state.referees.map((referee: User) =>
              <RefereeListItem key={referee.id} referee={referee} />
            )}
        </Flex>
      </Flex>
    </>
  );
}