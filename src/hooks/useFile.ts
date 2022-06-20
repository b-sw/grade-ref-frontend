import { useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import {Match} from "../entities/Match";
import {toastError} from "./shared/toastError";
import {uuid} from "../shared/uuid";
import { useParams } from "react-router-dom";

export const useFile = () => {
  const toast = useToast();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  const uploadFile = async (fileFormData: FormData): Promise<Match[]> => {
    const response = await axios.post(`leagues/${leagueId}/matches/upload`, fileFormData);
    return response.data;
  }

  const postMutation = useMutation(uploadFile, {
    onSuccess: (something: any) => {
      toast({
        title: `Successfully uploaded matches`,
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  return { postMutation }
}