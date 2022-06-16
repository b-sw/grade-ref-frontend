import { useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {Match} from "../entities/Match";
import {uuid} from "../shared/uuid";
import {getMatchesByDate} from "./shared/matches";
import {toastError} from "./shared/toastError";

const MATCHES_QUERY_KEY = 'matches_qk';

export interface Props {
  disableAutoRefetch: boolean;
  leagueId: uuid;
}

export const useLeagueMatches = (props?: Props) => {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();
  let { leagueId } = useParams<{ leagueId: uuid }>();
  leagueId = props ? props.leagueId : leagueId;

  const getMatches = async (): Promise<Match[]> => {
    const response = await axios.get(`leagues/${leagueId}/matches`);
    return response.data;
  }

  const postMatch = async (match: Match) => {
    const response = await axios.post(`leagues/${leagueId}/matches`, match);
    return response.data;
  }

  const updateMatch = async (match: Match) => {
    const response = await axios.put(`leagues/${leagueId}/matches/${match.id}`, match);
    return response.data;
  }

  const deleteMatch = async (matchId: uuid) => {
    const response = await axios.delete(`leagues/${leagueId}/matches/${matchId}`);
    return response.data;
  }

  const query = useQuery(
    [MATCHES_QUERY_KEY, leagueId],
    getMatches,
    { enabled: props ? !props.disableAutoRefetch : true },
  );

  const postMutation = useMutation(postMatch, {
    onSuccess: (match: Match) => {
      queryClient.setQueryData([MATCHES_QUERY_KEY, leagueId], (old: any) => [...old, match]);
      toast({
        title: 'Successfully added a match',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const updateMutation = useMutation(updateMatch, {
    onSuccess: (match: Match) => {
      queryClient.setQueryData([MATCHES_QUERY_KEY, leagueId], (old: any) => [...old.filter((m: Match) => m.id !== match.id), match]);
      toast({
        title: 'Successfully updated a match',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const deleteMutation = useMutation(deleteMatch, {
    onSuccess: (match: Match) => {
      queryClient.setQueryData([MATCHES_QUERY_KEY, leagueId], (old: any) => old.filter((m: Match) => m.id !== match.id));
      toast({
        title: 'Successfully deleted a match',
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

  return { query, postMutation, updateMutation, deleteMutation, getByDate };
}