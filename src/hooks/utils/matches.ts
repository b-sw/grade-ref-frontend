import dayjs, { Dayjs } from 'dayjs';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';

export const getMatchesByDate = (date: Dayjs, matches: MatchInfoEnriched[] | undefined): MatchInfoEnriched[] => {
  return (
    matches?.filter((match) => {
      return dayjs(match.matchDate).isSame(date, 'day');
    }) || []
  );
};
