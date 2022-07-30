import { useToast } from '@chakra-ui/react';
import { enrichMatch } from 'entities/utils/matchStatus';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import axios, { AxiosError } from 'axios';
import { toastError } from 'hooks/utils/toastError';
import { Match } from 'entities/Match';
import { MatchEnriched } from 'entities/MatchEnriched';

interface UseMatchProps {
  matchId?: uuid;
  leagueId?: uuid;
  enableAutoRefetch?: boolean;
}

export const MATCH_QUERY_KEY = 'match_qk';

export const useMatch = (props?: UseMatchProps) => {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();

  let { leagueId } = useParams<{ leagueId: uuid }>();
  let { matchId } = useParams<{ matchId: uuid }>();

  leagueId = props ? props.leagueId ?? leagueId : leagueId;
  matchId = props ? props.matchId ?? matchId : matchId;

  const getMatch = async (): Promise<MatchEnriched> => {
    const response = await axios.get(`leagues/${leagueId}/matches/${matchId}/details`);
    return enrichMatch(response.data);
  };

  const updateMatch = async (match: Match): Promise<MatchEnriched> => {
    const response = await axios.put(`leagues/${leagueId}/matches/${match.id}`, match);
    return enrichMatch(response.data);
  };

  const query = useQuery([MATCH_QUERY_KEY, matchId, 'details'], getMatch, {
    enabled: props ? !!props.enableAutoRefetch : false,
    staleTime: 60 * 1000,
  });

  const updateMatchMutation = useMutation(updateMatch, {
    onSuccess: (match: MatchEnriched) => {
      queryClient.invalidateQueries([MATCH_QUERY_KEY, match.id]);
      toast({
        title: 'Successfully updated a match',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError) => toastError(toast, error),
  });

  return { query, updateMatchMutation };
};
