import { useToast } from '@chakra-ui/react';
import { enrichMatchInfo } from 'entities/utils/matchStatus';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import axios, { AxiosError } from 'axios';
import { toastError } from 'hooks/utils/toastError';
import { MatchInfo } from 'entities/MatchInfo';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useTranslation } from 'react-i18next';

interface UseLeagueMatchProps {
    matchId?: uuid;
    leagueId?: uuid;
    enableAutoRefetch?: boolean;
}

interface NoteUpdateParams {
    matchId: uuid;
    refereeNote: string;
}

export const MATCH_QUERY_KEY = 'match_qk';

export const useLeagueMatch = (props?: UseLeagueMatchProps) => {
    const toast = useToast();
    const queryClient: QueryClient = useQueryClient();
    const { t } = useTranslation();

    let { leagueId } = useParams<{ leagueId: uuid }>();
    let { matchId } = useParams<{ matchId: uuid }>();

    leagueId = props ? props.leagueId ?? leagueId : leagueId;
    matchId = props ? props.matchId ?? matchId : matchId;

    const getMatch = async (): Promise<MatchInfoEnriched> => {
        const response = await axios.get(`leagues/${leagueId}/matches/${matchId}`);
        return enrichMatchInfo(response.data);
    };

    const updateRefereeNote = async ({ matchId, refereeNote }: NoteUpdateParams): Promise<MatchInfoEnriched> => {
        const response = await axios.put(`leagues/${leagueId}/matches/${matchId}/refereeNote`, {
            refereeNote: refereeNote,
        });
        return enrichMatchInfo(response.data);
    };

    const query = useQuery([MATCH_QUERY_KEY, matchId], getMatch, {
        enabled: props ? !!props.enableAutoRefetch : false,
        staleTime: 60 * 1000,
    });

    const updateRefereeNoteMutation = useMutation(updateRefereeNote, {
        onSuccess: (match: MatchInfo) => {
            queryClient.setQueryData([MATCH_QUERY_KEY, match.id], () => match);
            toast({
                title: t('success.refereeNoteUpdate'),
                status: 'success',
                position: 'bottom-right',
                duration: 2000,
            });
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    return { query, updateRefereeNoteMutation };
};
