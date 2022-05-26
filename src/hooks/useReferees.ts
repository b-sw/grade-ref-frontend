import axios from "axios";
import { useQuery } from "react-query";
import {User} from "../entities/User";
import { REFEREES_QUERY_KEY } from "./useUsers";

export interface Props {
  disableAutoRefetch: boolean;
}

export const useReferees = (props?: Props) => {
  const getReferees = async (): Promise<User[]> => {
    const response = await axios.get(`users/referees`);
    return response.data;
  }

  const refereesQuery = useQuery(
    REFEREES_QUERY_KEY,
    getReferees,
    { enabled: props ? !props.disableAutoRefetch : true },
  );

  return { refereesQuery };
}