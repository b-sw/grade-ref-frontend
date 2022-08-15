import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from 'entities/User';
import { REFEREES_QUERY_KEY } from './useUsers';

export interface Props {
  enableAutoRefetch: boolean;
}

export const useReferees = (props?: Props) => {
  const getReferees = async (): Promise<User[]> => {
    const response = await axios.get(`users/referees`);
    return response.data;
  };

  const refereesQuery = useQuery(REFEREES_QUERY_KEY, getReferees, {
    enabled: props ? props.enableAutoRefetch : false,
    staleTime: 60 * 1000,
  });

  return { refereesQuery };
};
