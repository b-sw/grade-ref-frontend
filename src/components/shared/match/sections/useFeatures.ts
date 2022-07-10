import { useToast } from "@chakra-ui/react";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {uuid} from "utils/uuid";
import axios, { AxiosError } from "axios";
import {toastError} from "hooks/utils/toastError";
import {Feature} from "entities/Feature";

interface Props {
  matchId: uuid;
}

const FEATURES_QUERY_KEY: string = 'features_qk';

export const useFeatures = (props: Props) => {
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const queryClient: QueryClient = useQueryClient();
  const toast = useToast();

  const queryKey = [FEATURES_QUERY_KEY, props.matchId];

  const getFeatures = async (): Promise<Feature[]> => {
    const response = await axios.get(`leagues/${leagueId}/matches/${props.matchId}/features`);
    return response.data;
  }

  const postFeature = async (feature: Feature): Promise<Feature> => {
    const response = await axios.post(`leagues/${leagueId}/matches/${props.matchId}/features`, feature);
    return response.data;
  }

  const updateFeature = async (feature: Feature): Promise<Feature> => {
    const response = await axios.put(`leagues/${leagueId}/matches/${props.matchId}/features/${feature.id}`, feature);
    return response.data;
  }

  const deleteFeature = async (featureId: uuid): Promise<Feature> => {
    const response = await axios.delete(`leagues/${leagueId}/matches/${props.matchId}/features/${featureId}`);
    return response.data;
  }

  const query = useQuery(queryKey, getFeatures);

  const postMutation = useMutation(postFeature, {
    onSuccess: (feature: Feature) => {
      queryClient.setQueryData(queryKey, (old: any) => [...old, feature]);
      toast({
        title: 'Successfully added a feature',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const updateMutation = useMutation(updateFeature, {
    onSuccess: (feature: Feature) => {
      queryClient.setQueryData(queryKey, (old: any) => [...old.filter((f: Feature) => f.id !== feature.id), feature]);
      toast({
        title: 'Successfully updated a feature',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const deleteMutation = useMutation(deleteFeature, {
    onSuccess: (feature: Feature) => {
      queryClient.setQueryData(queryKey, (old: any) => [...old.filter((f: Feature) => f.id !== feature.id)]);
      toast({
        title: 'Successfully deleted a feature',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  return { query, postMutation, updateMutation, deleteMutation };
}