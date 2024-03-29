import { Flex } from '@chakra-ui/react';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { LoadingOverlay } from './LoadingOverlay';
import { CalendarPanel } from 'components/calendar/CalendarPanel';
import { PageTitle } from 'utils/PageTitle';

import { useLeagues } from 'hooks/useLeagues';
import { MatchesPanel } from 'components/dashboard/matches/MatchesPanel';
import { useEffect, useState } from 'react';
import { useStore } from 'zustandStore/store';
import dayjs, { Dayjs } from 'dayjs';
import { useUserMatches } from 'hooks/useUserMatches';
import { HeaderPanel } from 'components/header/HeaderPanel';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { Page } from 'components/generic/Page';

interface State {
    matches: MatchInfoEnriched[];
}

export const Calendar = () => {
    const { query: matchesQuery } = useUserMatches({ enableAutoRefetch: true });
    const { query: teamsQuery } = useLeagueTeams({ enableAutoRefetch: true });
    const { query: leaguesQuery } = useLeagues({ enableAutoRefetch: true });

    const selectedDate: Dayjs = useStore((state) => state.selectedDate);
    const [state, setState] = useState<State>({
        matches: [],
    });

    useEffect(() => {
        const filteredMatches = matchesQuery.data?.filter((match) =>
            dayjs(match.matchDate).isSame(selectedDate, 'day'),
        );
        setState({ matches: filteredMatches ?? [] });
    }, [selectedDate]);

    const queries = [teamsQuery, matchesQuery, leaguesQuery];

    if (queries.some((query) => query.isLoading)) {
        return <LoadingOverlay />;
    }

    return (
        <Page>
            <HeaderPanel pageTitle={PageTitle.Calendar} />
            <Flex flexGrow={1} gap={[2, 2, 4]} direction={['column', 'row']} overflow={'hidden'} m={-10} p={10}>
                <CalendarPanel matches={matchesQuery.data!} readOnly={true} />
                <MatchesPanel matches={state.matches} readOnly={true} hideTabs={true} />
            </Flex>
        </Page>
    );
};
