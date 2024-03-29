import { useToast } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { Match } from 'entities/Match';
import { toastError } from './utils/toastError';
import { uuid } from 'utils/uuid';
import { useParams } from 'react-router-dom';
import { enrichMatch, enrichMatchDto } from 'entities/utils/matchStatus';
import { MATCHES_QUERY_KEY } from './useLeagueMatches';
import { MatchEnriched } from 'entities/MatchEnriched';
import { useTranslation } from 'react-i18next';

const UPLOADED_MATCHES_QK = 'uploaded_matches_qk';

export const useFile = () => {
    const toast = useToast();
    const queryClient: QueryClient = useQueryClient();
    const { leagueId } = useParams<{ leagueId: uuid }>();
    const { t } = useTranslation();

    const validateFile = async (fileFormData: FormData): Promise<MatchEnriched[]> => {
        const response = await axios.post(`leagues/${leagueId}/matches/upload/validate`, fileFormData);
        return response.data.map((dto: Partial<Match>, index: number) => enrichMatchDto(dto, index));
    };

    const uploadFile = async (fileFormData: FormData): Promise<MatchEnriched[]> => {
        const response = await axios.post(`leagues/${leagueId}/matches/upload`, fileFormData);
        return response.data.map((match: Match) => enrichMatch(match));
    };

    const query = useQuery(
        [UPLOADED_MATCHES_QK, leagueId],
        () => {
            return [] as MatchEnriched[];
        },
        {
            enabled: false,
            initialData: [] as MatchEnriched[],
            staleTime: 60 * 1000,
        },
    );

    const validateMutation = useMutation(validateFile, {
        onSuccess: (matchesDtos: MatchEnriched[]) => {
            queryClient.setQueryData([UPLOADED_MATCHES_QK, leagueId], () => matchesDtos);
            toast({
                title: t('success.matchesValidate', { howMany: matchesDtos.length }),
                status: 'success',
                position: 'bottom-right',
                duration: 2000,
            });
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    const postMutation = useMutation(uploadFile, {
        onSuccess: (matches: MatchEnriched[]) => {
            queryClient.setQueryData([MATCHES_QUERY_KEY, leagueId], (old: any) => [...old, ...matches]);
            toast({
                title: t('success.matchesUpload', { howMany: matches.length }),
                status: 'success',
                position: 'bottom-right',
                duration: 2000,
            });
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    return { query, validateMutation, postMutation };
};
