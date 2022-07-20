import {Flex, SimpleGrid,} from '@chakra-ui/react';
import {AdminHeaderPanel} from "components/admin/header/AdminHeaderPanel";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {useLeagueMatches} from "hooks/useLeagueMatches";
import {LoadingOverlay} from "./LoadingOverlay";
import {useLeagueUsers} from "hooks/useLeagueUsers";
import {Role} from "utils/Role";
import {PageTitle} from "utils/PageTitle";
import {uuid} from "utils/uuid";
import {Match} from "entities/Match";
import {useEffect} from "react";
import {useSetState} from "hooks/useSetState";
import { useParams } from 'react-router-dom';
import {MatchSectionsPanel} from "components/matchPage/MatchSectionsPanel";

interface State {
  match?: Match;
}

export const MatchPage = () => {
  const { usersQuery: leagueRefereesQuery } = useLeagueUsers(Role.Referee, { enableAutoRefetch: true });
  const { usersQuery: leagueObserversQuery } = useLeagueUsers(Role.Observer, { enableAutoRefetch: true });
  const { query: teamsQuery } = useLeagueTeams({ enableAutoRefetch: true });
  const { query: matchesQuery } = useLeagueMatches({ enableAutoRefetch: true });

  const { matchId } = useParams<{ matchId: uuid }>();
  const [state, setState] = useSetState({} as State);

  useEffect(() => {
    if (matchesQuery.isSuccess) {
      const match: Match | undefined = matchesQuery.data!.find((match: Match) => match.id === matchId);
      if (match) {
        setState({ match });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchesQuery.data]);

  const queries = [leagueRefereesQuery, leagueObserversQuery, teamsQuery, matchesQuery];
  if (queries.some((query) => query.isLoading) || !state.match) {
    return (<LoadingOverlay />);
  }

  return (
    <>
      <Flex p={[2, 4]} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
        <AdminHeaderPanel pageTitle={PageTitle.MatchDetails} />
        <SimpleGrid columns={[1, 1, 1]} flexGrow={1} overflowY={'hidden'} spacing={4} p={[4, 4, 4]} m={-4}>
          <MatchSectionsPanel
            match={state.match}
            teams={teamsQuery.data!}
            referees={leagueRefereesQuery.data!}
            observers={leagueObserversQuery.data!}
          />
        </SimpleGrid>
      </Flex>
    </>
  );
}
