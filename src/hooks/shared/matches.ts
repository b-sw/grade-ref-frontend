import dayjs, { Dayjs } from "dayjs";
import {Match} from "../../entities/Match";

export const getMatchesByDate = (date: Dayjs, matches: Match[]): Match[] => {
    return matches.filter((match) => dayjs(match.matchDate).format('YYYY-MM-DD') === date.format('YYYY-MM-DD'));
};