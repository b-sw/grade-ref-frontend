import axios, { AxiosError } from "axios";
import {QueryClient, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Match } from "entities/Match";
import {uuid} from "utils/uuid";
import {USER_LEAGUE_MATCHES_QK} from "./useUserMatches";
import { useStore } from "zustandStore/store";
import { useToast } from "@chakra-ui/react";
import {toastError} from "./utils/toastError";

export interface UseGradesProps {
  matchId: uuid;
}

export const useGrades = ({ matchId }: UseGradesProps) => {
  const user = useStore((state) => state.user);
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const queryClient: QueryClient = useQueryClient();
  const toast = useToast();

  const updateGrade = async (match: Match): Promise<Match> => {
    const response = await axios.put(`leagues/${leagueId}/matches/${matchId}/grade`, match);
    return response.data;
  }

  const updateMutation = useMutation(updateGrade, {
    onSuccess(match: Match) {
      queryClient.setQueryData([USER_LEAGUE_MATCHES_QK, user.id], (old: any) => [...old.filter((m: Match) => m.id !== match.id), match]);
      toast({
        title: 'Successfully updated a grade',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  return { updateMutation };
}

