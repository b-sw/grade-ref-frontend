import {Flex, SimpleGrid,} from '@chakra-ui/react';
import {AdminHeaderPanel} from "../components/adminDashboard/header/AdminHeaderPanel";
import {MatchesPanel} from "../components/adminDashboard/matches/MatchesPanel";
import {RefereesPanel} from "../components/adminDashboard/referees/RefereesPanel";
import {ObserversPanel} from "../components/adminDashboard/observers/ObserversPanel";
import {TeamsPanel} from "../components/adminDashboard/teams/TeamsPanel";
import {AdminSettingsPanel} from "../components/adminDashboard/settings/AdminSettingsPanel";
import {useLeagueTeams} from "../hooks/useLeagueTeams";
import {useLeagueMatches} from "../hooks/useLeagueMatches";
import {LoadingOverlay} from "./LoadingOverlay";
import {useLeagues} from "../hooks/useLeagues";
import {useLeagueUsers} from "../hooks/useLeagueUsers";
import {Role} from "../shared/Role";
import {useReferees} from "../hooks/useReferees";
import {useObservers} from "../hooks/useObservers";

export const AdminDashboard = () => {
  const { refereesQuery: allRefereesQuery } = useReferees();
  const { observersQuery: allObserversQuery } = useObservers();
  const { usersQuery: leagueRefereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: leagueObserversQuery } = useLeagueUsers(Role.Observer);
  const { query: teamsQuery } = useLeagueTeams();
  const { query: matchesQuery } = useLeagueMatches();
  const { query: leaguesQuery } = useLeagues();

  const queries = [leagueRefereesQuery, leagueObserversQuery, teamsQuery, matchesQuery, leaguesQuery, allRefereesQuery, allObserversQuery];

  if (queries.some((query) => query.isLoading)) {
    return (<LoadingOverlay />);
  }

  return (
    <>
      <Flex p={5} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
        <AdminHeaderPanel pageTitle={'admin dashboard'} />
        <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={5} p={5} m={-5} pt={5}>
          <MatchesPanel matches={matchesQuery.data!} />
          <Flex direction={'column'} gap={5} overflowY={'hidden'}>
            <RefereesPanel />
            <ObserversPanel />
          </Flex>
          <Flex direction={'column'} gap={5} overflowY={'hidden'}>
            <TeamsPanel />
            <AdminSettingsPanel />
          </Flex>
        </SimpleGrid>
      </Flex>
    </>
  );
}