import axios, { AxiosError } from 'axios';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import { useToast } from '@chakra-ui/react';
import { toastError } from './utils/toastError';
import { MATCH_QUERY_KEY } from 'hooks/useLeagueMatch';
import { enrichMatchInfo } from 'entities/utils/matchStatus';
import { useStore } from 'zustandStore/store';
import { USER_LEAGUE_MATCHES_QK } from 'hooks/useUserMatches';
import { MatchInfo } from 'entities/MatchInfo';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';

interface UseGradesProps {
  matchId: uuid;
}

export const useGrades = (props?: UseGradesProps) => {
  const user = useStore((state) => state.user);
  const { leagueId } = useParams<{ leagueId: uuid }>();
  let { matchId } = useParams<{ matchId: uuid }>();

  matchId = props ? props.matchId ?? matchId : matchId;

  const queryClient: QueryClient = useQueryClient();
  const toast = useToast();

  const updateGrade = async (match: MatchInfo): Promise<MatchInfoEnriched> => {
    const response = await axios.put(`leagues/${leagueId}/matches/${matchId}/grade`, match);
    return enrichMatchInfo(response.data);
  };

  const updateOverallGrade = async (match: MatchInfo): Promise<MatchInfoEnriched> => {
    const response = await axios.put(`leagues/${leagueId}/matches/${matchId}/overallGrade`, match);
    return enrichMatchInfo(response.data);
  };

  const updateGradeMutation = useMutation(updateGrade, {
    onSuccess(match: MatchInfo) {
      queryClient.setQueryData([MATCH_QUERY_KEY, match.id], () => match);
      queryClient.setQueryData([USER_LEAGUE_MATCHES_QK, user.id, leagueId], (old: any) => [
        ...old.filter((m: MatchInfo) => m.id !== match.id),
        match,
      ]);
      toast({
        title: 'Successfully updated a grade',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError) => toastError(toast, error),
  });

  const updateOverallGradeMutation = useMutation(updateOverallGrade, {
    onSuccess(match: MatchInfo) {
      queryClient.setQueryData([MATCH_QUERY_KEY, match.id], () => match);
      toast({
        title: 'Successfully updated an overall grade',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError) => toastError(toast, error),
  });

  return { updateGradeMutation, updateOverallGradeMutation };
};
