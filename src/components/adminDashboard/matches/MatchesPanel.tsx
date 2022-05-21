import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {Match} from "../../../entities/Match";
import {MatchListItem} from "./MatchListItem";
import {useMatches} from "../../../hooks/useMatches";
import {MatchCreateModal} from "./MatchCreateModal";
import {Constants} from "../../../shared/Constants";
import dayjs from 'dayjs';
import {useSetState} from "../../../hooks/useSetState";
import {matchFilter} from "../../shared/filters";
import {useEffect} from "react";
import {MdSearch} from 'react-icons/md';
import {useTeams} from "../../../hooks/useTeams";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";
import {uuid} from "../../../shared/uuid";
import {User} from "../../../entities/User";
import {Team} from "../../../entities/Team";

interface State {
  matches: Match[],
  filter: string,
}

export const MatchesPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query: matchesQuery } = useMatches();
  const { query: teamsQuery } = useTeams();
  const { leagueUsersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { leagueUsersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  let referees: { [id: uuid]: User } = {};
  let observers: { [id: uuid]: User } = {};
  let teams: { [id: uuid]: Team } = {};

  refereesQuery.data!.forEach((referee) => referees[referee.id] = referee);
  observersQuery.data!.forEach((observer) => observers[observer.id] = observer);
  teamsQuery.data!.forEach((team) => teams[team.id] = team);

  const [state, setState] = useSetState({
    matches: [],
    filter: '',
  } as State);

  useEffect(() => {
    setState({ matches: matchesQuery.data })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchesQuery.data]);

  useEffect(() => {
    const filteredMatches: Match[] = matchFilter(matchesQuery.data!, teams, referees, observers, state.filter);
    setState({ matches: filteredMatches });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filter]);

  return (
    <>
      <MatchCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
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
            Matches
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
            placeholder={'Search match'}
            onChange={(event) => setState({ filter: event.target.value })}
          />
        </InputGroup>

        <Tabs display='flex' flexDirection='column' isFitted variant='line' overflowY={'hidden'}>
          <TabList>
            <Tab>Past</Tab>
            <Tab>Upcoming</Tab>
          </TabList>
          <TabPanels overflowY={'scroll'} css={scrollbarStyle}>
            <TabPanel>
              <Flex direction={'column'} gap={2}>
                {
                  state.matches
                  .filter((match: Match) =>
                    dayjs(match.matchDate, Constants.DATETIME_FORMAT).toDate().getTime() < Date.now())
                  .map((match: Match) =>
                    <MatchListItem key={match.id} match={match} />)
                }
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction={'column'} gap={2}>
                {
                  state.matches
                  .filter((match: Match) =>
                    dayjs(match.matchDate, Constants.DATETIME_FORMAT).toDate().getTime() >= Date.now())
                  .map((match: Match) =>
                    <MatchListItem key={match.id} match={match} />)
                }
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}