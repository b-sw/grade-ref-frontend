import dayjs from "dayjs";
import {Match} from "../../../entities/Match";
import {Constants} from "../../../shared/Constants";
import {getGradeInfo} from "./gradeInfo";
import { v4 as randomUuid } from 'uuid';

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

export const enrichMatchDto = (dto: Partial<Match>, index: number): Match => {
  const match: Match = enrichMatch(dto as Match);
  match.id = randomUuid();
  match.userReadableKey = String(index);
  return match;
}