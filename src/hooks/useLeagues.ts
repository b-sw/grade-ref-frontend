import { useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import {QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import {uuid} from "../shared/uuid";
import {League} from "../entities/League";
import {Paths} from "../shared/Paths";
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/store";
import {Role} from "../shared/Role";
import {toastError} from "./shared/toastError";

export const LEAGUES_QUERY_KEY: string = 'leagues_qk'

export const useLeagues = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();

  const queryKey: any = user.role === Role.Owner ? LEAGUES_QUERY_KEY : [LEAGUES_QUERY_KEY, user.id];

  const getLeagues = async (): Promise<League[]> => {
    const url: string = user.role === Role.Owner ? `leagues` : `users/${user.id}/leagues`;
    const response = await axios.get(url);
    return response.data;
  }

  const postLeague = async (league: League): Promise<League> => {
    const response = await axios.post(`leagues`, league);
    return response.data;
  }

  const updateLeague = async (league: League): Promise<League> => {
    const response = await axios.put(`leagues/${league.id}`, league);
    return response.data;
  }

  const deleteLeague = async (leagueId: uuid): Promise<League> => {
    const response = await axios.delete(`leagues/${leagueId}`);
    return response.data;
  }

  const query = useQuery(queryKey, getLeagues);

  const postMutation = useMutation(postLeague, {
    onSuccess: (league: League) => {
      queryClient.setQueryData(queryKey, (old: any) => [...old, league]);
      toast({
        title: 'Successfully added a league',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const updateMutation = useMutation(updateLeague, {
    onSuccess: (league: League) => {
      const leagues: League[] = queryClient.getQueryData(queryKey)!;
      const index: number = leagues.findIndex((l: League) => l.id === league.id);
      leagues[index] = league;
      queryClient.setQueryData(queryKey, (_) => leagues);
      toast({
        title: 'Successfully updated a league',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const deleteMutation = useMutation(deleteLeague, {
    onSuccess: (league: League) => {
      queryClient.setQueryData(queryKey, (old: any) => old.filter((l: League) => l.id !== league.id));
      toast({
        title: 'Successfully deleted a league',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
      navigate(Paths.ADMIN_EXPLORER);
    },
  });

  return { query, postMutation, updateMutation, deleteMutation }
}
