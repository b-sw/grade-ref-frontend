import dayjs, { Dayjs } from "dayjs";
import {Match} from "../../entities/Match";

export const getMatchesByDate = (date: Dayjs, matches: Match[] | undefined): Match[] => {
    return matches?.filter((match: Match) => {
        return dayjs(match.matchDate).isSame(date, 'day');
    }) || [];
}