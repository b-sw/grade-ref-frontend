import { Flex, Input, InputGroup, InputLeftElement, Spacer, Text } from '@chakra-ui/react';
import {MatchGradeSummaryHeader} from "../../shared/MatchGradeSummaryHeader";
import {scrollbarStyle} from "../shared/styles";
import {MatchGradeListItem} from "../../shared/MatchGradeListItem";
import {uuid} from "../../../shared/uuid";
import {useUserMatches} from "../../../hooks/useUserMatches";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";
import {Match} from "../../../entities/Match";
import {useSetState} from "../../../hooks/useSetState";
import {User} from "../../../entities/User";
import {useEffect} from "react";
import { MdSearch } from 'react-icons/md';
import {matchFilter} from "../../shared/filters";
import {useLeagueTeams} from "../../../hooks/useLeagueTeams";
import {Team} from "../../../entities/Team";
import useStore from "../../../zustand/store";

interface State {
  matches: Match[];
  observers: { [id: uuid]: User };
  filter: string;
}

interface Props {
  matches: Match[];
}

export const GradesPanel = (props: Props) => {
  const user = useStore((state) => state.user);
  const { query: matchesQuery } = useUserMatches();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);

  let referees: { [id: uuid]: User } = {};
  let observers: { [id: uuid]: User } = {};
  let teams: { [id: uuid]: Team } = {};

  refereesQuery.data!.forEach((referee) => referees[referee.id] = referee);
  observersQuery.data!.forEach((observer) => observers[observer.id] = observer);
  teamsQuery.data!.forEach((team) => teams[team.id] = team);


  const [state, setState] = useSetState({
    matches: [],
    observers: {},
    filter: '',
  } as State);

  useEffect(() => {
    if (observersQuery.isSuccess) {
      let mappedObservers: { [id: uuid]: User } = {};
      observersQuery.data!.forEach((observer) => mappedObservers[observer.id] = observer);
      setState({ observers: mappedObservers } as State);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observersQuery.data])

  useEffect(() => {
    const filteredMatches: Match[] = matchFilter(props.matches, teams, referees, observers, state.filter);
    setState({ matches: filteredMatches });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filter, state.observers, props.matches]);

  return (
    <>
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
            Grades
          </Text>
          <Spacer />
        </Flex>

        <MatchGradeSummaryHeader matches={matchesQuery.data!} />

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

        <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
          {state.observers !== {} && state.matches.map((match) =>
            <MatchGradeListItem key={match.id} readOnly={user.role !== Role.Observer} match={match} user={state.observers[match.observerId]} />
          )}
        </Flex>

      </Flex>
    </>
  );
}