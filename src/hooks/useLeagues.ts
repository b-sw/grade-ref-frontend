import { useToast } from "@chakra-ui/react";
import axios from "axios";
import {QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import {uuid} from "../other/uuid";
import {League} from "../entities/League";
import {Paths} from "../other/Paths";
import { useNavigate } from "react-router-dom";

const LEAGUES_QUERY_KEY: string = 'leagues_qk'

export const useLeagues = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();

  const getLeagues = async (): Promise<League[]> => {
    const response = await axios.get(`leagues`);
    return response.data;
  }

  const postLeague = async (league: League) => {
    const response = await axios.post(`leagues`, league);
    return response.data;
  }

  const updateLeague = async (league: League) => {
    const response = await axios.put(`leagues/${league.id}`, league);
    return response.data;
  }

  const deleteLeague = async (leagueId: uuid) => {
    const response = await axios.delete(`leagues/${leagueId}`);
    return response.data;
  }

  const query = useQuery(LEAGUES_QUERY_KEY, getLeagues);

  const postMutation = useMutation(postLeague, {
    onSuccess: (league: League) => {
      queryClient.setQueryData(LEAGUES_QUERY_KEY, (old: any) => [...old, league]);
      toast({
        title: 'Successfully added a league',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  const updateMutation = useMutation(updateLeague, {
    onSuccess: (league: League) => {
      const leagues: League[] = queryClient.getQueryData(LEAGUES_QUERY_KEY)!;
      const index: number = leagues.findIndex((l: League) => l.id === league.id);
      leagues[index] = league;
      queryClient.setQueryData(LEAGUES_QUERY_KEY, (_) => leagues);
      toast({
        title: 'Successfully updated a league',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteLeague, {
    onSuccess: (league: League) => {
      queryClient.setQueryData(LEAGUES_QUERY_KEY, (old: any) => old.filter((l: League) => l.id !== league.id));
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