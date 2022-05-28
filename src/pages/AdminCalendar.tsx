import { Flex } from "@chakra-ui/react";
import {MatchesPanel} from "../components/adminDashboard/matches/MatchesPanel";
import {useLeagueTeams} from "../hooks/useLeagueTeams";
import {useLeagueUsers} from "../hooks/useLeagueUsers";
import {Role} from "../shared/Role";
import {LoadingOverlay} from "./LoadingOverlay";
import {AdminHeaderPanel} from "../components/adminDashboard/header/AdminHeaderPanel";
import {useLeagueMatches} from "../hooks/useLeagueMatches";
import {CalendarPanel} from "../components/adminDashboard/calendar/CalendarPanel";

export const AdminCalendar = () => {
  const { query: matchesQuery } = useLeagueMatches();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  const queries = [matchesQuery, refereesQuery, observersQuery, teamsQuery];

  if (queries.some((query) => query.isLoading)) {
    return (<LoadingOverlay />);
  }

  return (
    <Flex p={[2, 4]} m={0} h={['100vh']} direction={'column'} overflow={'hidden'}>
      <AdminHeaderPanel pageTitle={'calendar'} />
      <Flex flexGrow={1} gap={[2, 2, 4]} direction={['column', 'row']} overflow={'hidden'} m={-10} p={10}>
        <CalendarPanel matches={matchesQuery.data!} />
        <MatchesPanel matches={matchesQuery.data!} />
      </Flex>
    </Flex>
  );
}