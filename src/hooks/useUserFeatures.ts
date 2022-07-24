import { useStore } from 'zustandStore/store';
import { Feature } from 'entities/Feature';
import axios from 'axios';
import { useQuery } from 'react-query';

interface UseUserFeaturesProps {
  enableAutoRefetch: boolean;
}

const USER_FEATURES_QUERY_KEY = 'user_features_qk';

export const useUserFeatures = (props?: UseUserFeaturesProps) => {
  const user = useStore((state) => state.user);

  const getUserFeatures = async (): Promise<Feature[]> => {
    const response = await axios.get(`users/${user.id}/features`);
    return response.data;
  }

  const query = useQuery(
    [USER_FEATURES_QUERY_KEY, user.id],
    getUserFeatures,
    { enabled: props ? props.enableAutoRefetch : false },
  );

  return { query };
}