import {
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import {GradesPanel} from '../components/dashboard/grades/GradesPanel';
import {HeaderPanel} from "../components/dashboard/header/HeaderPanel";
import {LoadingOverlay} from "./LoadingOverlay";
import {useUserMatches} from "../hooks/useUserMatches";
import {MatchesPanel} from "../components/adminDashboard/matches/MatchesPanel";
import {useLeagueUsers} from "../hooks/useLeagueUsers";
import {Role} from "../shared/Role";
import {useLeagueTeams} from "../hooks/useLeagueTeams";

export const Dashboard = () => {
  const { query: matchesQuery } = useUserMatches();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  const queries = [matchesQuery, refereesQuery, observersQuery, teamsQuery];

  if (queries.some((query) => query.isLoading)) {
    return (<LoadingOverlay />);
  }

  return (
    <>
      <Flex p={5} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
        <HeaderPanel />
        <SimpleGrid columns={[1, 1, 2]} flexGrow={1} overflowY={'hidden'} spacing={5} px={[5, 5, 5]} m={-5} py={5}>
          <MatchesPanel readOnly={true} matches={matchesQuery.data!} />
          <GradesPanel matches={matchesQuery.data!} />
        </SimpleGrid>
      </Flex>
    </>
  );
}