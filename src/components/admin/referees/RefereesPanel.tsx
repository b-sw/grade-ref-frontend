import { Button, Flex, Input, InputGroup, InputLeftElement, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { User } from 'entities/User';
import { RefereeListItem } from 'components/admin/referees/RefereeListItem';
import { RefereeAddModal } from 'components/admin/referees/RefereeAddModal';
import { useLeagueUsers } from 'hooks/useLeagueUsers';
import { Role } from 'utils/Role';
import { useSetState } from 'hooks/useSetState';
import { userFilter } from 'components/utils/filters';
import { useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import { NoRecords } from 'components/utils/NoRecords';
import { useTranslation } from 'react-i18next';

interface State {
  referees: User[];
  filter: string;
}

export const RefereesPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { t } = useTranslation();

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
      <RefereeAddModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
      <Flex
        direction={'column'}
        borderRadius={10}
        p={5}
        backgroundColor={'gray.300'}
        shadow={'md'}
        overflow={'hidden'}
        flexGrow={1}
        h={['auto', '100%']}
        w={['auto', '50%']}
        maxH={['90vh', '100%']}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            {t('referee_many')}
          </Text>
          <Spacer />
          <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
            {t('modal.add')}
          </Button>
        </Flex>

        <InputGroup>
          <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
          <Input
            mb={2}
            placeholder={t('referees.search')}
            onChange={(event) => setState({ filter: event.target.value })}
          />
        </InputGroup>

        <Flex direction={'column'} gap={2} overflow={'scroll'}>
          {state.referees.length
            ? state.referees.map((referee: User) => <RefereeListItem key={referee.id} referee={referee} />)
            : NoRecords(t('noRecords'))}
        </Flex>
      </Flex>
    </>
  );
};
