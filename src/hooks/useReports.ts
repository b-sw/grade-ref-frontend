import { toast, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Match } from 'entities/Match';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import { MATCHES_QUERY_KEY } from './useLeagueMatches';
import { USER_LEAGUE_MATCHES_QK } from './useUserMatches';

export enum ReportType {
  Observer = 'Observer',
  Mentor = 'Mentor',
  Tv = 'Tv',
}

export interface ReportDto {
  type: ReportType;
  fileFormData: FormData;
}

export const useReports = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const { matchId } = useParams<{ matchId: uuid }>();

  const uploadReport = async (dto: ReportDto): Promise<Match> => {
    console.log(dto);
    const response = await axios.post(`leagues/${leagueId}/matches/${matchId}/reports/${dto.type}`, dto.fileFormData);
    return response.data;
  };

  const deleteReport = async (type: ReportType): Promise<Match> => {
    const response = await axios.delete(`leagues/${leagueId}/matches/${matchId}/reports/${type}`);
    return response.data;
  };

  const postMutation = useMutation(uploadReport, {
    onSuccess(match: Match) {
      queryClient.invalidateQueries([MATCHES_QUERY_KEY]);
      toast({
        title: 'Successfully updated a grade',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteReport, {
    onSuccess(match: Match) {
      queryClient.invalidateQueries([MATCHES_QUERY_KEY]);
      toast({
        title: 'Successfully deleted a report',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
      console.log(match);
    },
  });

  return { postMutation, deleteMutation };
};