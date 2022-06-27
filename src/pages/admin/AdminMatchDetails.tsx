import {Flex, SimpleGrid,} from '@chakra-ui/react';
import {AdminHeaderPanel} from "../../components/adminDashboard/header/AdminHeaderPanel";
import {useLeagueTeams} from "../../hooks/useLeagueTeams";
import {useLeagueMatches} from "../../hooks/useLeagueMatches";
import {LoadingOverlay} from "../LoadingOverlay";
import {useLeagues} from "../../hooks/useLeagues";
import {useLeagueUsers} from "../../hooks/useLeagueUsers";
import {Role} from "../../shared/Role";
import {PageTitle} from "../../shared/PageTitle";
import {uuid} from "../../shared/uuid";
import {Match} from "../../entities/Match";
import {useEffect} from "react";
import {useSetState} from "../../hooks/useSetState";
import { useParams } from 'react-router-dom';
import {MatchOverviewPanel} from "../../components/shared/match/MatchOverviewPanel";

interface State {
  match?: Match;
}

export const AdminMatchDetails = () => {
  const { usersQuery: leagueRefereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: leagueObserversQuery } = useLeagueUsers(Role.Observer);
  const { query: teamsQuery } = useLeagueTeams();
  const { query: matchesQuery } = useLeagueMatches();
  const { query: leaguesQuery } = useLeagues();

  const { matchId } = useParams<{ matchId: uuid }>();
  const [state, setState] = useSetState({} as State);

  useEffect(() => {
    if (matchesQuery.isSuccess) {
      const match: Match | undefined = matchesQuery.data!.find((match: Match) => match.id === matchId);
      if (match) {
        setState({ match });
      }
    }
  }, [matchesQuery.data]);

  const queries = [leagueRefereesQuery, leagueObserversQuery, teamsQuery, matchesQuery, leaguesQuery];
  if (queries.some((query) => query.isLoading) || !state.match) {
    return (<LoadingOverlay />);
  }

  return (
    <>
      <Flex p={[2, 4]} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
        <AdminHeaderPanel pageTitle={PageTitle.MatchDetails} />
        <SimpleGrid columns={[1, 1, 1]} flexGrow={1} overflowY={'hidden'} spacing={4} p={[4, 4, 4]} m={-4}>
          <MatchOverviewPanel match={state.match} />
        </SimpleGrid>
      </Flex>
    </>
  );
}
