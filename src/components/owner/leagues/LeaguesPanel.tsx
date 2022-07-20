import {Button, Flex, InputLeftElement, InputGroup, Spacer, Text, useDisclosure, Input } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {LeagueCreateModal} from "components/owner/leagues/LeagueCreateModal";
import {scrollbarStyle} from "components/dashboard/styles/styles";
import {LeagueListItem} from "components/owner/leagues/LeagueListItem";
import {League} from "entities/League";
import {useLeagues} from "hooks/useLeagues";
import { MdSearch } from 'react-icons/md';
import {useSetState} from "hooks/useSetState";
import {leagueFilter} from "components/utils/filters";
import {useEffect} from 'react';

interface State {
  leagues: League[],
  filter: string,
}

export const LeaguesPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query: leaguesQuery } = useLeagues();

  const [state, setState] = useSetState({
    leagues: [],
    filter: '',
  } as State);

  useEffect(() => {
    const filteredLeagues: League[] = leagueFilter(leaguesQuery.data!, state.filter);
    setState({ leagues: filteredLeagues });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filter, leaguesQuery.data]);

  return (
    <>
      <LeagueCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
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
            Leagues
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
            placeholder={'Search league'}
            onChange={(event) => setState({ filter: event.target.value })}
          />
        </InputGroup>

        <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
          {state.leagues.map((league: League) =>
              <LeagueListItem key={league.id} league={league} />
          )}
        </Flex>
      </Flex>
    </>
  );
}