import { useToast } from '@chakra-ui/react';
import { enrichMatch } from 'entities/utils/matchStatus';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import axios, { AxiosError } from 'axios';
import { Match } from 'entities/Match';
import { toastError } from 'hooks/utils/toastError';
import { MATCHES_QUERY_KEY } from 'hooks/useLeagueMatches';

interface UseMatchProps {
  matchId?: uuid;
  leagueId?: uuid;
  enableAutoRefetch?: boolean;
}

interface NoteUpdateParams {
  matchId: uuid;
  refereeNote: string;
}

export const MATCH_QUERY_KEY = 'match_qk';

export const useLeagueMatch = (props?: UseMatchProps) => {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();

  let { leagueId } = useParams<{ leagueId: uuid }>();
  let { matchId } = useParams<{ matchId: uuid }>();

  leagueId = props ? props.leagueId ?? leagueId : leagueId;
  matchId = props ? props.matchId ?? matchId : matchId;

  const getMatch = async (): Promise<Match> => {
    const response = await axios.get(`leagues/${leagueId}/matches/${matchId}`);
    return enrichMatch(response.data);
  }

  const updateMatch = async (match: Match): Promise<Match> => {
    const response = await axios.put(`leagues/${leagueId}/matches/${match.id}`, match);
    return enrichMatch(response.data);
  }

  const updateRefereeNote = async ({ matchId, refereeNote }: NoteUpdateParams): Promise<Match> => {
    const response = await axios.put(`leagues/${leagueId}/matches/${matchId}/refereeNote`, { refereeNote: refereeNote });
    return enrichMatch(response.data);
  }

  const query = useQuery(
    [MATCH_QUERY_KEY, matchId],
    getMatch,
    { enabled: props ? !!props.enableAutoRefetch : false },
  );

  const updateMatchMutation = useMutation(updateMatch, {
    onSuccess: (match: Match) => {
      queryClient.setQueryData([MATCH_QUERY_KEY, match.id], (_: any) => enrichMatch(match));
      toast({
        title: 'Successfully updated a match',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const updateRefereeNoteMutation = useMutation(updateRefereeNote, {
    onSuccess: (match: Match) => {
      queryClient.setQueryData([MATCH_QUERY_KEY, match.id], (_: any) => enrichMatch(match));
      toast({
        title: 'Successfully updated a referee note',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  return { query, updateRefereeNoteMutation, updateMatchMutation };
}