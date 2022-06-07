import { Flex, Spacer, Text } from '@chakra-ui/react';
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

interface State {
  matches: Match[];
  observers: { [id: uuid]: User };
  filter: string;
}

interface Props {
  matches: Match[];
}

export const GradesPanel = (props: Props) => {
  const { query: matchesQuery } = useUserMatches();
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

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
    const filteredMatches: Match[] = props.matches;
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
        <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
          {state.observers !== {} && state.matches.map((match) =>
            <MatchGradeListItem key={match.id} match={match} user={state.observers[match.observerId]} />
          )}
        </Flex>
      </Flex>
    </>
  );
}