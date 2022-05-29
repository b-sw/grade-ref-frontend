import { Flex } from "@chakra-ui/react";
import {useLeagueTeams} from "../hooks/useLeagueTeams";
import {useLeagueUsers} from "../hooks/useLeagueUsers";
import {Role} from "../shared/Role";
import {LoadingOverlay} from "./LoadingOverlay";
import {AdminHeaderPanel} from "../components/adminDashboard/header/AdminHeaderPanel";
import {useLeagueMatches} from "../hooks/useLeagueMatches";
import {CalendarPanel} from "../components/adminDashboard/calendar/CalendarPanel";
import { PageTitle } from "../shared/PageTitle";
import {useLeagues} from "../hooks/useLeagues";

export const AdminCalendar = () => {
  const { query: matchesQuery } = useLeagueMatches();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);
  const { query: leaguesQuery } = useLeagues();

  const queries = [matchesQuery, refereesQuery, observersQuery, teamsQuery, leaguesQuery];

  if (queries.some((query) => query.isLoading)) {
    return (<LoadingOverlay />);
  }

  return (
    <Flex p={5} m={0} h={['100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
      <AdminHeaderPanel pageTitle={PageTitle.Calendar} />
      <Flex flexGrow={1} gap={[2, 2, 4]} direction={['column', 'row']} overflow={'hidden'} m={-10} p={10}>
        <CalendarPanel />
      </Flex>
    </Flex>
  );
}