import { uuid } from 'utils/uuid';

export type MatchInfo = {
  id: uuid;
  userReadableKey: string;
  matchDate: Date;
  stadium: string;
  homeTeamId: uuid;
  awayTeamId: uuid;
  referee: string;
  observer: string;
  refereeGrade?: number;
  refereeGradeDate?: Date;
  refereeNote?: string;
  overallGrade?: string;
  overallGradeDate?: Date;
  observerReportKey?: string;
  mentorReportKey?: string;
  tvReportKey?: string;
};
