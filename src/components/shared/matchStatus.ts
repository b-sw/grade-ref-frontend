import dayjs from "dayjs";
import {Match} from "../../entities/Match";
import {Constants} from "../../shared/Constants";
import {getGradeInfo} from "./gradeInfo";

export enum MatchStatus {
  Past = 'Past',
  Upcoming = 'Upcoming',
}

export const getMatchStatus = (match: Match): MatchStatus => {
  if (dayjs(match.matchDate, Constants.DATETIME_FORMAT).toDate().getTime() < Date.now()) {
    return MatchStatus.Past;
  } else {
    return MatchStatus.Upcoming;
  }
}

export const enrichMatch = (match: Match): Match => {
  match.gradeStatus = getGradeInfo(match);
  match.matchStatus = getMatchStatus(match);
  return match;
}