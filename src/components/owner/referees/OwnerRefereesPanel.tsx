import { Button, Flex, Input, InputGroup, InputLeftElement, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { User } from 'entities/User';
import { RefereeListItem } from 'components/owner/referees/RefereeListItem';
import { RefereeCreateModal } from 'components/owner/referees/RefereeCreateModal';
import { MdSearch } from 'react-icons/md';
import { useSetState } from 'hooks/useSetState';
import { userFilter } from 'components/utils/filters';
import { useEffect } from 'react';
import { useReferees } from 'hooks/useReferees';

interface State {
  referees: User[];
  filter: string;
}

export const OwnerRefereesPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { refereesQuery } = useReferees();

  const [state, setState] = useSetState({
    referees: [],
    filter: '',
  } as State);

  useEffect(() => {
    const filteredReferees: User[] = userFilter(refereesQuery.data!, state.filter);
    setState({ referees: filteredReferees });
  }, [state.filter, refereesQuery.data]);

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
          <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
          <Input mb={2} placeholder={'Search referee'} onChange={(event) => setState({ filter: event.target.value })} />
        </InputGroup>

        <Flex direction={'column'} gap={2} overflowY={'scroll'}>
          {state.referees.map((referee: User) => (
            <RefereeListItem key={referee.id} referee={referee} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};
