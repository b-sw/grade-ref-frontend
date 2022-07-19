import {uuid} from "utils/uuid";
import {Match} from "entities/Match";
import axios, { AxiosError } from "axios";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { useStore } from "zustandStore/store";
import { useParams } from "react-router-dom";
import { Dayjs } from "dayjs";
import {getMatchesByDate} from "./utils/matches";
import {enrichMatch} from "entities/utils/matchStatus";
import { toastError } from 'hooks/utils/toastError';
import { useToast } from "@chakra-ui/react";

interface Props {
  userId?: uuid;
  leagueId: uuid;
  disableAutoRefetch: boolean;
}

export const USER_LEAGUE_MATCHES_QK = 'user_league_matches_qk';

export const useUserMatches = (props?: Props) => {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();

  const user = useStore((state) => state.user);
  const userId: uuid = props ? props.userId ?? user.id! : user.id!;
  let { leagueId } = useParams<{ leagueId: uuid }>();

  leagueId = props ? props.leagueId : leagueId;

  const getMatches = async (): Promise<Match[]> => {
    const response = await axios.get(`users/${userId}/leagues/${leagueId}/matches`);
    return response.data.map((match: Match) => enrichMatch(match));
  }

  const updateRefereeNote = async ({ matchId, refereeNote }: NoteUpdateParams): Promise<Match> => {
    const response = await axios.post(`leagues/${leagueId}/matches/${matchId}/refereeNote`, { refereeNote: refereeNote });
    return enrichMatch(response.data);
  }

  const query = useQuery(
    [USER_LEAGUE_MATCHES_QK, userId, leagueId],
    getMatches,
    { enabled: props ? props.disableAutoRefetch : true }
  );

  interface NoteUpdateParams {
    matchId: uuid;
    refereeNote: string;
  }

  const updateRefereeNoteMutation = useMutation(updateRefereeNote, {
    onSuccess: (match: Match) => {
      queryClient.setQueryData([USER_LEAGUE_MATCHES_QK, userId, leagueId], (old: any) => [...old.filter((m: Match) => m.id !== match.id), match]);
      toast({
        title: 'Successfully updated a team',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const getByDate = (date: Dayjs) => {
    return getMatchesByDate(date, query.data);
  }

  return { query, updateRefereeNoteMutation, getByDate };
}