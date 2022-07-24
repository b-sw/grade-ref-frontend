import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Match } from 'entities/Match';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import { MATCHES_QUERY_KEY } from './useLeagueMatches';
import { MATCH_QUERY_KEY } from 'hooks/useLeagueMatch';

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
    const response = await axios.post(`leagues/${leagueId}/matches/${matchId}/reports/${dto.type}`, dto.fileFormData);
    return response.data;
  };

  const deleteReport = async (type: ReportType): Promise<Match> => {
    const response = await axios.delete(`leagues/${leagueId}/matches/${matchId}/reports/${type}`);
    return response.data;
  };

  const postMutation = useMutation(uploadReport, {
    onSuccess(_match: Match) {
      queryClient.invalidateQueries([MATCHES_QUERY_KEY]);
      queryClient.invalidateQueries([MATCH_QUERY_KEY]);
      toast({
        title: 'Successfully uploaded a report',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteReport, {
    onSuccess(_match: Match) {
      queryClient.invalidateQueries([MATCHES_QUERY_KEY]);
      queryClient.invalidateQueries([MATCH_QUERY_KEY]);
      toast({
        title: 'Successfully deleted a report',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  return { postMutation, deleteMutation };
};
