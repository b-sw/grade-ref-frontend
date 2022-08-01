import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import { MATCHES_QUERY_KEY } from './useLeagueMatches';
import { MATCH_QUERY_KEY } from 'hooks/useLeagueMatch';
import { enrichMatchInfo } from 'entities/utils/matchStatus';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const uploadReport = async (dto: ReportDto): Promise<MatchInfoEnriched> => {
    const response = await axios.post(`leagues/${leagueId}/matches/${matchId}/reports/${dto.type}`, dto.fileFormData);
    return enrichMatchInfo(response.data);
  };

  const deleteReport = async (type: ReportType): Promise<MatchInfoEnriched> => {
    const response = await axios.delete(`leagues/${leagueId}/matches/${matchId}/reports/${type}`);
    return enrichMatchInfo(response.data);
  };

  const postMutation = useMutation(uploadReport, {
    onSuccess() {
      queryClient.invalidateQueries([MATCHES_QUERY_KEY]);
      queryClient.invalidateQueries([MATCH_QUERY_KEY]);
      toast({
        title: t('success.reportUpload'),
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteReport, {
    onSuccess() {
      queryClient.invalidateQueries([MATCHES_QUERY_KEY]);
      queryClient.invalidateQueries([MATCH_QUERY_KEY]);
      toast({
        title: t('success.reportDelete'),
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  return { postMutation, deleteMutation };
};
