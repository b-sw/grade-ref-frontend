import { Flex } from '@chakra-ui/react';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { useLeagueUsers } from 'hooks/useLeagueUsers';
import { Role } from 'utils/Role';
import { LoadingOverlay } from '../LoadingOverlay';
import { AdminHeaderPanel } from 'components/admin/header/AdminHeaderPanel';
import { useLeagueMatches } from 'hooks/useLeagueMatches';
import { CalendarPanel } from 'components/calendar/CalendarPanel';
import { PageTitle } from 'utils/PageTitle';
import { useLeagues } from 'hooks/useLeagues';
import { MatchesPanel } from 'components/dashboard/matches/MatchesPanel';
import { useEffect, useState } from 'react';
import { useStore } from 'zustandStore/store';
import dayjs, { Dayjs } from 'dayjs';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';

interface State {
  matches: MatchInfoEnriched[];
}

export const AdminCalendar = () => {
  const { query: matchesQuery } = useLeagueMatches({ enableAutoRefetch: true });
  const { query: teamsQuery } = useLeagueTeams({ enableAutoRefetch: true });
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee, { enableAutoRefetch: true });
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer, { enableAutoRefetch: true });
  const { query: leaguesQuery } = useLeagues({ enableAutoRefetch: true });

  const selectedDate: Dayjs = useStore((state) => state.selectedDate);
  const [state, setState] = useState<State>({
    matches: [],
  });

  useEffect(() => {
    const filteredMatches = matchesQuery.data?.filter((match) => dayjs(match.matchDate).isSame(selectedDate, 'day'));
    setState({ matches: filteredMatches ?? [] });
  }, [selectedDate, matchesQuery.data]);

  const queries = [refereesQuery, observersQuery, teamsQuery, matchesQuery, leaguesQuery];

  if (queries.some((query) => query.isLoading)) {
    return <LoadingOverlay />;
  }

  return (
    <Flex p={[2, 4]} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
      <AdminHeaderPanel pageTitle={PageTitle.Calendar} />
      <Flex flexGrow={1} gap={[2, 2, 4]} direction={['column', 'row']} overflow={'hidden'} m={-10} p={10}>
        <CalendarPanel matches={matchesQuery.data!} />
        <MatchesPanel matches={state.matches} hideTabs={true} />
      </Flex>
    </Flex>
  );
};
