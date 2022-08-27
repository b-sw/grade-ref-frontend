import { useToast } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { uuid } from 'utils/uuid';
import { League } from 'entities/League';
import { Path } from 'utils/Path';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustandStore/store';
import { Role } from 'utils/Role';
import { toastError } from './utils/toastError';
import { useTranslation } from 'react-i18next';

export const LEAGUES_QUERY_KEY = 'leagues_qk';

interface UseLeaguesProps {
    enableAutoRefetch: boolean;
}

export const useLeagues = (props?: UseLeaguesProps) => {
    const user = useStore((state) => state.user);
    const navigate = useNavigate();
    const toast = useToast();
    const queryClient: QueryClient = useQueryClient();
    const { t } = useTranslation();

    const queryKey: any = user.role === Role.Owner ? LEAGUES_QUERY_KEY : [LEAGUES_QUERY_KEY, user.id];

    const getLeagues = async (): Promise<League[]> => {
        const url: string = user.role === Role.Owner ? `leagues` : `users/${user.id}/leagues`;
        const response = await axios.get(url);
        return response.data;
    };

    const postLeague = async (league: League): Promise<League> => {
        const response = await axios.post(`leagues`, league);
        return response.data;
    };

    const updateLeague = async (league: League): Promise<League> => {
        const response = await axios.put(`leagues/${league.id}`, league);
        return response.data;
    };

    const deleteLeague = async (leagueId: uuid): Promise<League> => {
        const response = await axios.delete(`leagues/${leagueId}`);
        return response.data;
    };

    const query = useQuery(queryKey, getLeagues, {
        enabled: props ? props.enableAutoRefetch : false,
        staleTime: 60 * 1000,
    });

    const postMutation = useMutation(postLeague, {
        onSuccess: (league: League) => {
            queryClient.setQueryData(queryKey, (old: any) => [...old, league]);
            toast({
                title: t('success.leagueAdd'),
                status: 'success',
                position: 'bottom-right',
                duration: 2000,
            });
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    const updateMutation = useMutation(updateLeague, {
        onSuccess: (league: League) => {
            queryClient.setQueryData(queryKey, (old: any) => [
                ...old.filter((l: League) => l.id !== league.id),
                league,
            ]);
            toast({
                title: t('success.leagueUpdate'),
                status: 'success',
                position: 'bottom-right',
                duration: 2000,
            });
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    const deleteMutation = useMutation(deleteLeague, {
        onSuccess: (league: League) => {
            queryClient.setQueryData(queryKey, (old: any) => old.filter((l: League) => l.id !== league.id));
            toast({
                title: t('success.leagueDelete'),
                status: 'success',
                position: 'bottom-right',
                duration: 2000,
            });
            navigate(Path.ADMIN_EXPLORER);
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    return { query, postMutation, updateMutation, deleteMutation };
};
