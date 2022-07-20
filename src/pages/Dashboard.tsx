import {
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import {GradesPanel} from 'components/dashboard/grades/GradesPanel';
import {HeaderPanel} from "components/dashboard/header/HeaderPanel";
import {LoadingOverlay} from "./LoadingOverlay";
import {useUserMatches} from "hooks/useUserMatches";
import {MatchesPanel} from "components/dashboard/matches/MatchesPanel";
import {useLeagueUsers} from "hooks/useLeagueUsers";
import {Role} from "utils/Role";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {PageTitle} from "utils/PageTitle";
import {useLeagues} from "hooks/useLeagues";

export const Dashboard = () => {
  const { query: matchesQuery } = useUserMatches({ enableAutoRefetch: true });
  const { query: teamsQuery } = useLeagueTeams({ enableAutoRefetch: true });
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee, { enableAutoRefetch: true });
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer, { enableAutoRefetch: true });
  const { query: leaguesQuery } = useLeagues({ enableAutoRefetch: true });

  const queries = [matchesQuery, refereesQuery, observersQuery, teamsQuery, leaguesQuery];

  if (queries.some((query) => query.isLoading)) {
    return (<LoadingOverlay />);
  }

  return (
    <>
      <Flex p={[2, 4]} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
        <HeaderPanel pageTitle={PageTitle.Dashboard}/>
        <SimpleGrid columns={[1, 1, 2]} flexGrow={1} overflowY={'hidden'} spacing={5} px={[5, 5, 5]} m={-5} py={5}>
          <MatchesPanel readOnly={true} matches={matchesQuery.data!} />
          <GradesPanel matches={matchesQuery.data!} />
        </SimpleGrid>
      </Flex>
    </>
  );
}