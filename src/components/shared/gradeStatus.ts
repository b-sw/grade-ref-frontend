import dayjs, { Dayjs } from "dayjs";
import {Match} from "../../entities/Match";

export const determineGradeStatus = (match: Match): { gradeStatus: string, gradeBadgeScheme: string } => {
  const datetime: Dayjs = dayjs(match.matchDate);
  const now: Dayjs = dayjs();
  if (datetime.add(2, 'hour') < now) {
    if (match.refereeGrade) {
      return {
        gradeStatus: 'received',
        gradeBadgeScheme: 'green',
      }
    } else {
      return {
        gradeStatus: 'overdue',
        gradeBadgeScheme: 'red',
      }
    }
  }

  if (datetime.add(4, 'hour') > now) {
    return {
      gradeStatus: 'expected',
      gradeBadgeScheme: 'gray'
    }
  }

  return {
    gradeStatus: 'pending',
    gradeBadgeScheme: 'orange',
  }

}