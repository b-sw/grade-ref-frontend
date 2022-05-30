import { Flex } from "@chakra-ui/react";
import {useLeagueTeams} from "../hooks/useLeagueTeams";
import {useLeagueUsers} from "../hooks/useLeagueUsers";
import {Role} from "../shared/Role";
import {LoadingOverlay} from "./LoadingOverlay";
import {CalendarPanel} from "../components/adminDashboard/calendar/CalendarPanel";
import { PageTitle } from "../shared/PageTitle";
import {useLeagues} from "../hooks/useLeagues";
import {MatchesPanel} from "../components/adminDashboard/matches/MatchesPanel";
import {Match} from "../entities/Match";
import {useEffect, useState} from "react";
import useStore from "../zustand/store";
import dayjs, { Dayjs } from "dayjs";
import {useUserMatches} from "../hooks/useUserMatches";
import {HeaderPanel} from "../components/dashboard/header/HeaderPanel";

interface State {
  matches: Match[];
}

export const Calendar = () => {
  const { query: matchesQuery } = useUserMatches();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);
  const { query: leaguesQuery } = useLeagues();

  const selectedDate: Dayjs = useStore((state) => state.selectedDate);
  const [state, setState] = useState<State>({
    matches: [],
  });

  useEffect(() => {
    const filteredMatches = matchesQuery.data?.filter((match) => dayjs(match.matchDate).isSame(selectedDate, 'day'));
    setState({ matches: filteredMatches ?? [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const queries = [refereesQuery, observersQuery, teamsQuery, matchesQuery, leaguesQuery];

  if (queries.some((query) => query.isLoading)) {
    return (<LoadingOverlay />);
  }

  return (
    <Flex p={5} m={0} h={['100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
      <HeaderPanel pageTitle={PageTitle.Calendar} />
      <Flex flexGrow={1} gap={[2, 2, 4]} direction={['column', 'row']} overflow={'hidden'} m={-10} p={10}>
        <CalendarPanel matches={matchesQuery.data!} readOnly={true} />
        <MatchesPanel matches={state.matches} readOnly={true} hideTabs={true} />
      </Flex>
    </Flex>
  );
}