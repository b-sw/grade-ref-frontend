import { useToast } from "@chakra-ui/react";
import axios from "axios";
import {QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {Team} from "../entities/Team";
import {uuid} from "../other/uuid";

const TEAMS_QUERY_KEY: string = 'teams_qk'

export const useTeams = () => {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  const getTeams = async (): Promise<Team[]> => {
    const response = await axios.get(`leagues/${leagueId}/teams`);
    return response.data;
  }

  const postTeam = async (team: Team) => {
    const response = await axios.post(`leagues/${leagueId}/teams`, team);
    return response.data;
  }

  const updateTeam = async (team: Team) => {
    const response = await axios.put(`leagues/${leagueId}/teams/${team.id}`, team);
    return response.data;
  }

  const deleteTeam = async (teamId: uuid) => {
    const response = await axios.delete(`leagues/${leagueId}/teams/${teamId}`);
    return response.data;
  }

  const query = useQuery(TEAMS_QUERY_KEY, getTeams);

  const postMutation = useMutation(postTeam, {
    onSuccess: (team: Team) => {
      queryClient.setQueryData(TEAMS_QUERY_KEY, (old: any) => [...old, team]);
      toast({
        title: 'Successfully added a team',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  const updateMutation = useMutation(updateTeam, {
    onSuccess: (team: Team) => {
      const teams: Team[] = queryClient.getQueryData(TEAMS_QUERY_KEY)!;
      const index: number = teams.findIndex((t: Team) => t.id === team.id);
      teams[index] = team;
      queryClient.setQueryData(TEAMS_QUERY_KEY, (_) => teams);
      toast({
        title: 'Successfully updated a team',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteTeam, {
    onSuccess: (team: Team) => {
      queryClient.setQueryData(TEAMS_QUERY_KEY, (old: any) => old.filter((t: Team) => t.id !== team.id));
      toast({
        title: 'Successfully deleted a team',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  return { query, postMutation, updateMutation, deleteMutation }
}