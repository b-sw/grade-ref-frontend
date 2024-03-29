import { uuid } from 'utils/uuid';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useStore } from 'zustandStore/store';
import { useParams } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { getMatchesByDate } from './utils/matches';
import { enrichMatch } from 'entities/utils/matchStatus';
import { Match } from 'entities/Match';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';

interface Props {
    userId?: uuid;
    leagueId?: uuid;
    enableAutoRefetch?: boolean;
}

export const USER_LEAGUE_MATCHES_QK = 'user_league_matches_qk';

export const useUserMatches = (props?: Props) => {
    const user = useStore((state) => state.user);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId: uuid = props ? props.userId ?? user.id! : user.id!;
    let { leagueId } = useParams<{ leagueId: uuid }>();

    leagueId = props ? props.leagueId ?? leagueId : leagueId;

    const getMatches = async (): Promise<MatchInfoEnriched[]> => {
        const response = await axios.get(`users/${userId}/leagues/${leagueId}/matches`);
        return response.data.map((match: Match) => enrichMatch(match));
    };

    const query = useQuery([USER_LEAGUE_MATCHES_QK, userId, leagueId], getMatches, {
        enabled: props ? !!props.enableAutoRefetch : false,
        staleTime: 60 * 1000,
    });

    const getByDate = (date: Dayjs) => {
        return getMatchesByDate(date, query.data);
    };

    return { query, getByDate };
};
