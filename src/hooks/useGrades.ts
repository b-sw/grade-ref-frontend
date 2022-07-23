import axios, { AxiosError } from "axios";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Match } from "entities/Match";
import { uuid } from "utils/uuid";
import { useToast } from "@chakra-ui/react";
import {toastError} from "./utils/toastError";
import { MATCH_QUERY_KEY } from 'hooks/useLeagueMatch';
import { enrichMatch } from 'entities/utils/matchStatus';

export const useGrades = () => {
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const { matchId } = useParams<{ matchId: uuid }>();

  const queryClient: QueryClient = useQueryClient();
  const toast = useToast();

  const updateGrade = async (match: Match): Promise<Match> => {
    const response = await axios.put(`leagues/${leagueId}/matches/${matchId}/grade`, match);
    return response.data;
  }

  const updateOverallGrade = async (match: Match): Promise<Match> => {
    const response = await axios.put(`leagues/${leagueId}/matches/${matchId}/overallGrade`, match);
    return response.data;
  }

  const updateGradeMutation = useMutation(updateGrade, {
    onSuccess(match: Match) {
      queryClient.setQueryData([MATCH_QUERY_KEY, match.id], (_: any) => enrichMatch(match));
      toast({
        title: 'Successfully updated a grade',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const updateOverallGradeMutation = useMutation(updateOverallGrade, {
    onSuccess(match: Match) {
      queryClient.setQueryData([MATCH_QUERY_KEY, match.id], (_: any) => enrichMatch(match));
      toast({
        title: 'Successfully updated an overall grade',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  return { updateGradeMutation, updateOverallGradeMutation };
}

