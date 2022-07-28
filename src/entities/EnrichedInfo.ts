import { GradeInfo } from 'entities/utils/gradeInfo';
import { MatchStatus } from 'entities/utils/matchStatus';

export type EnrichedInfo = {
  gradeStatus: GradeInfo;
  matchStatus: MatchStatus;
};
