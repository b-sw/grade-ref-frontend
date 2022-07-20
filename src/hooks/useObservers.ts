import axios from "axios";
import { useQuery } from "react-query";
import {User} from "entities/User";
import { OBSERVERS_QUERY_KEY } from "./useUsers";

export interface Props {
  enableAutoRefetch: boolean;
}

export const useObservers = (props?: Props) => {
  const getObservers = async (): Promise<User[]> => {
    const response = await axios.get(`users/observers`);
    return response.data;
  }

  const observersQuery = useQuery(
    OBSERVERS_QUERY_KEY,
    getObservers,
    { enabled: props ? props.enableAutoRefetch : false },
  );

  return { observersQuery }
}