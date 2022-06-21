import { useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import {QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import {Match} from "../entities/Match";
import {toastError} from "./shared/toastError";
import {uuid} from "../shared/uuid";
import { useParams } from "react-router-dom";
import {enrichMatch, enrichMatchDto} from "../components/shared/matchStatus";
import {MATCHES_QUERY_KEY} from "./useLeagueMatches";

const UPLOADED_MATCHES_QK = 'uploaded_matches_qk';

export const useFile = () => {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  const validateFile = async (fileFormData: FormData): Promise<Match[]> => {
    const response = await axios.post(`leagues/${leagueId}/matches/upload/validate`, fileFormData);
    return response.data.map((dto: Partial<Match>, index: number) => enrichMatchDto(dto, index));
  }

  const uploadFile = async (fileFormData: FormData): Promise<Match[]> => {
    const response = await axios.post(`leagues/${leagueId}/matches/upload`, fileFormData);
    return response.data.map((match: Match) => enrichMatch(match));
  }

  const query = useQuery(
    [UPLOADED_MATCHES_QK, leagueId],
    () => { return [] as Match[]; },
    {
      enabled: false,
      initialData: [] as Match[],
    },
  );

  const validateMutation = useMutation(validateFile, {
    onSuccess: (matchesDtos: Match[]) => {
      queryClient.setQueryData([UPLOADED_MATCHES_QK, leagueId], (_old: any) => matchesDtos);
      toast({
        title: `Successfully validated ${matchesDtos.length} matches`,
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const postMutation = useMutation(uploadFile, {
    onSuccess: (matches: Match[]) => {
      queryClient.setQueryData([MATCHES_QUERY_KEY, leagueId], (old: any) => [...old, ...matches]);
      toast({
        title: `Successfully uploaded ${matches.length} matches`,
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  return { query, validateMutation, postMutation };
}