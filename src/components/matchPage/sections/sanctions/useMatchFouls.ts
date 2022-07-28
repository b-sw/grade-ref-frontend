import { useToast } from '@chakra-ui/react';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import { Foul } from 'entities/Foul';
import axios, { AxiosError } from 'axios';
import { toastError } from 'hooks/utils/toastError';

interface Props {
  enableAutoRefetch?: boolean;
}

const FOULS_QUERY_KEY = 'fouls_qk';

export const useMatchFouls = (props?: Props) => {
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const { matchId } = useParams<{ matchId: uuid }>();
  const queryClient: QueryClient = useQueryClient();
  const toast = useToast();

  const queryKey = [FOULS_QUERY_KEY, matchId];

  const getFouls = async (): Promise<Foul[]> => {
    const response = await axios.get(`leagues/${leagueId}/matches/${matchId}/fouls`);
    return response.data;
  };

  const postFoul = async (foul: Foul): Promise<Foul> => {
    const response = await axios.post(`leagues/${leagueId}/matches/${matchId}/fouls`, foul);
    return response.data;
  };

  const updateFoul = async (foul: Foul): Promise<Foul> => {
    const response = await axios.put(`leagues/${leagueId}/matches/${matchId}/fouls/${foul.id}`, foul);
    return response.data;
  };

  const deleteFoul = async (foulId: uuid): Promise<Foul> => {
    const response = await axios.delete(`leagues/${leagueId}/matches/${matchId}/fouls/${foulId}`);
    return response.data;
  };

  const query = useQuery(queryKey, getFouls, { enabled: props ? !!props.enableAutoRefetch : false });

  const postMutation = useMutation(postFoul, {
    onSuccess: (foul: Foul) => {
      queryClient.setQueryData(queryKey, (old: any) => [...old, foul]);
      toast({
        title: 'Successfully added a foul',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError) => toastError(toast, error),
  });

  const updateMutation = useMutation(updateFoul, {
    onSuccess: (foul: Foul) => {
      queryClient.setQueryData(queryKey, (old: any) => [...old.filter((f: Foul) => f.id !== foul.id), foul]);
      toast({
        title: 'Successfully updated a foul',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError) => toastError(toast, error),
  });

  const deleteMutation = useMutation(deleteFoul, {
    onSuccess: (foul: Foul) => {
      queryClient.setQueryData(queryKey, (old: any) => [...old.filter((f: Foul) => f.id !== foul.id)]);
      toast({
        title: 'Successfully deleted a foul',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError) => toastError(toast, error),
  });

  return { query, postMutation, updateMutation, deleteMutation };
};
