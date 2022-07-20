import {Flex, SimpleGrid,} from '@chakra-ui/react';
import {AdminHeaderPanel} from "components/admin/header/AdminHeaderPanel";
import {MatchesPanel} from "components/dashboard/matches/MatchesPanel";
import {RefereesPanel} from "components/admin/referees/RefereesPanel";
import {ObserversPanel} from "components/admin/observers/ObserversPanel";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {useLeagueMatches} from "hooks/useLeagueMatches";
import {LoadingOverlay} from "../LoadingOverlay";
import {useLeagues} from "hooks/useLeagues";
import {useLeagueUsers} from "hooks/useLeagueUsers";
import {Role} from "utils/Role";
import {useReferees} from "hooks/useReferees";
import {useObservers} from "hooks/useObservers";
import {PageTitle} from "utils/PageTitle";

export const AdminDashboard = () => {
  const { refereesQuery: allRefereesQuery } = useReferees({ enableAutoRefetch: true });
  const { observersQuery: allObserversQuery } = useObservers({ enableAutoRefetch: true });
  const { usersQuery: leagueRefereesQuery } = useLeagueUsers(Role.Referee, { enableAutoRefetch: true });
  const { usersQuery: leagueObserversQuery } = useLeagueUsers(Role.Observer, { enableAutoRefetch: true });
  const { query: teamsQuery } = useLeagueTeams({ enableAutoRefetch: true });
  const { query: matchesQuery } = useLeagueMatches({ enableAutoRefetch: true });
  const { query: leaguesQuery } = useLeagues({ enableAutoRefetch: true });

  const queries = [leagueRefereesQuery, leagueObserversQuery, teamsQuery, matchesQuery, leaguesQuery, allRefereesQuery, allObserversQuery];

  if (queries.some((query) => query.isLoading)) {
    return (<LoadingOverlay />);
  }

  return (
    <>
      <Flex p={[2, 4]} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
        <AdminHeaderPanel pageTitle={PageTitle.AdminDashboard} />
        <SimpleGrid columns={[1, 1, 2]} flexGrow={1} overflowY={'hidden'} spacing={4} p={[4, 4, 4]} m={-4}>
          <MatchesPanel matches={matchesQuery.data!} />
          <Flex gap={4} overflowY={'hidden'}>
            <RefereesPanel />
            <ObserversPanel />
          </Flex>
        </SimpleGrid>
      </Flex>
    </>
  );
}
