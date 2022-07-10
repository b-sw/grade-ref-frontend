import {uuid} from "utils/uuid";
import Yup from "utils/yup";
import {GradeInfo} from "components/shared/match/gradeInfo";
import {MatchStatus} from "components/shared/match/matchStatus";

export const GRADE_ADMISSION_TIME_WINDOW = 4;
export const MATCH_DURATION_TIME = 2;

export type Match = {
  id: uuid;
  userReadableKey: string;
  matchDate: Date;
  stadium: string;
  homeTeamId: uuid;
  awayTeamId: uuid;
  refereeId: uuid;
  observerId: uuid;
  refereeGrade: number;
  refereeGradeDate: Date;
  refereeSmsId: uuid;
  observerSmsId: uuid;
  gradeStatus: GradeInfo;
  matchStatus: MatchStatus;
  overallGrade: string;
  overallGradeDate: Date;
  refereeNote: string;
}

export const matchValidationSchema = Yup.object({
  date: Yup.string().required(),
  homeTeamId: Yup.string().required(),
  awayTeamId: Yup.string().required(),
  refereeId: Yup.string().required(),
  observerId: Yup.string().required(),
});

export const gradeValidationSchema = Yup.object({
  grade: Yup.number().required().min(0).max(10),
})