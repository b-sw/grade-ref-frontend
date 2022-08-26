import { useToast } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { Dayjs } from 'dayjs';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import { getMatchesByDate } from './utils/matches';
import { toastError } from './utils/toastError';
import { enrichMatch, enrichMatchInfo } from 'entities/utils/matchStatus';
import { MatchInfo } from 'entities/MatchInfo';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { Match } from 'entities/Match';
import { MatchEnriched } from 'entities/MatchEnriched';
import { useTranslation } from 'react-i18next';

export const MATCHES_QUERY_KEY = 'matches_qk';

export interface Props {
    enableAutoRefetch?: boolean;
    leagueId?: uuid;
}

export const useLeagueMatches = (props?: Props) => {
    const toast = useToast();
    const queryClient: QueryClient = useQueryClient();
    let { leagueId } = useParams<{ leagueId: uuid }>();
    leagueId = props ? props.leagueId ?? leagueId : leagueId;
    const { t } = useTranslation();

    const getMatches = async (): Promise<MatchInfoEnriched[]> => {
        const response = await axios.get(`leagues/${leagueId}/matches`);
        return response.data.map((match: MatchInfo) => enrichMatchInfo(match));
    };

    const postMatch = async (match: Match): Promise<MatchEnriched> => {
        const response = await axios.post(`leagues/${leagueId}/matches`, match);
        return enrichMatch(response.data);
    };

    const deleteMatch = async (matchId: uuid): Promise<MatchEnriched> => {
        const response = await axios.delete(`leagues/${leagueId}/matches/${matchId}`);
        return enrichMatch(response.data);
    };

    const query = useQuery([MATCHES_QUERY_KEY, leagueId], getMatches, {
        enabled: props ? !!props.enableAutoRefetch : false,
        staleTime: 60 * 1000,
    });

    const postMutation = useMutation(postMatch, {
        onSuccess: () => {
            queryClient.invalidateQueries([MATCHES_QUERY_KEY, leagueId]);
            toast({
                title: t('success.matchAdd'),
                status: 'success',
                position: 'bottom-right',
                duration: 2000,
            });
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    const deleteMutation = useMutation(deleteMatch, {
        onSuccess: () => {
            queryClient.invalidateQueries([MATCHES_QUERY_KEY, leagueId]);
            toast({
                title: t('success.matchDelete'),
                status: 'success',
                position: 'bottom-right',
                duration: 2000,
            });
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    const getByDate = (date: Dayjs) => {
        return getMatchesByDate(date, query.data);
    };

    return { query, postMutation, deleteMutation, getByDate };
};
