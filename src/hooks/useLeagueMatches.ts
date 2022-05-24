import {uuid} from "../shared/uuid";
import {Match} from "../entities/Match";
import axios from "axios";
import { useQuery } from "react-query";

interface Props {
  userId: uuid;
  leagueId: uuid;
  disableAutoRefetch: boolean;
}

const USER_LEAGUE_MATCHES_QK = 'user_league_matches_qk';

export const useLeagueMatches = (props: Props) => {

  const getMatches = async (): Promise<Match[]> => {
    const response = await axios.get(`users/${props.userId}/leagues/${props.leagueId}/matches`);
    return response.data;
  }

  const query = useQuery(
    [USER_LEAGUE_MATCHES_QK, props.userId],
    getMatches,
    { enabled: props.disableAutoRefetch }
  );

  return { query }
}