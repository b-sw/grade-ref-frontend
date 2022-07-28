import { useToast } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Team } from 'entities/Team';
import { uuid } from 'utils/uuid';
import { toastError } from './utils/toastError';

const TEAMS_QUERY_KEY = 'teams_qk';

export interface Props {
  enableAutoRefetch?: boolean;
  leagueId?: uuid;
}

export const useLeagueTeams = (props?: Props) => {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();
  let { leagueId } = useParams<{ leagueId: uuid }>();
  leagueId = props ? props.leagueId ?? leagueId : leagueId;

  const getTeams = async (): Promise<Team[]> => {
    const response = await axios.get(`leagues/${leagueId}/teams`);
    return response.data;
  };

  const postTeam = async (team: Team) => {
    const response = await axios.post(`leagues/${leagueId}/teams`, team);
    return response.data;
  };

  const updateTeam = async (team: Team) => {
    const response = await axios.put(`leagues/${leagueId}/teams/${team.id}`, team);
    return response.data;
  };

  const deleteTeam = async (teamId: uuid) => {
    const response = await axios.delete(`leagues/${leagueId}/teams/${teamId}`);
    return response.data;
  };

  const query = useQuery([TEAMS_QUERY_KEY, leagueId], getTeams, { enabled: props ? !!props.enableAutoRefetch : false });

  const postMutation = useMutation(postTeam, {
    onSuccess: (team: Team) => {
      queryClient.setQueryData([TEAMS_QUERY_KEY, leagueId], (old: any) => [...old, team]);
      toast({
        title: 'Successfully added a team',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError) => toastError(toast, error),
  });

  const updateMutation = useMutation(updateTeam, {
    onSuccess: (team: Team) => {
      queryClient.setQueryData([TEAMS_QUERY_KEY, leagueId], (old: any) => [
        ...old.filter((t: Team) => t.id !== team.id),
        team,
      ]);
      toast({
        title: 'Successfully updated a team',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError) => toastError(toast, error),
  });

  const deleteMutation = useMutation(deleteTeam, {
    onSuccess: (team: Team) => {
      queryClient.setQueryData([TEAMS_QUERY_KEY, leagueId], (old: any) => old.filter((t: Team) => t.id !== team.id));
      toast({
        title: 'Successfully deleted a team',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError) => toastError(toast, error),
  });

  return { query, postMutation, updateMutation, deleteMutation };
};
