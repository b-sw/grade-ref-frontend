import dayjs, { Dayjs } from "dayjs";
import {GRADE_ADMISSION_TIME_WINDOW, Match, MATCH_DURATION_TIME} from "../../entities/Match";

export const determineGradeStatus = (match: Match): { gradeStatus: string, gradeBadgeScheme: string, delay: string | null } => {
  const matchStart: Dayjs = dayjs(match.matchDate);
  const admissionEnd: Dayjs = dayjs(match.matchDate).add(GRADE_ADMISSION_TIME_WINDOW, 'hour');
  const now: Dayjs = dayjs();
  let dayDelay: number;
  let hourDelay: number;
  let minuteDelay: number;
  let gradeStatus: string;
  let gradeBadgeScheme: string;

  if (matchStart.add(MATCH_DURATION_TIME, 'hour') < now) {
    const admission: Dayjs = dayjs(match.refereeGradeDate);
    if (match.refereeGrade) {
      dayDelay = admission.diff(dayjs(admissionEnd), 'day');
      hourDelay = admission.diff(dayjs(admissionEnd), 'hour') % 24;
      minuteDelay = admission.diff(dayjs(admissionEnd), 'minute') % 60;
      if (dayDelay === 0 && hourDelay < 2) {
        dayDelay = hourDelay = minuteDelay = 0;
      }
      gradeStatus = 'received';
      gradeBadgeScheme = 'green';
    } else {
      dayDelay = dayjs().diff(dayjs(admissionEnd), 'day');
      hourDelay = dayjs().diff(dayjs(admissionEnd), 'hour') % 24;
      minuteDelay = dayjs().diff(dayjs(admissionEnd), 'minute') % 60;
      gradeStatus = 'overdue';
      gradeBadgeScheme = 'red';
    }

    return {
      gradeStatus: gradeStatus,
      gradeBadgeScheme: gradeBadgeScheme,
      delay: (dayDelay > 0 ? dayDelay + 'd' : '') + (hourDelay > 0 ? hourDelay + 'h' : '') + (minuteDelay > 0 ? minuteDelay + 'm' : '')
    }
  }

  if (matchStart.add(GRADE_ADMISSION_TIME_WINDOW, 'hour') > now) {
    return {
      gradeStatus: 'expected',
      gradeBadgeScheme: 'gray',
      delay: null,
    }
  }

  return {
    gradeStatus: 'pending',
    gradeBadgeScheme: 'orange',
    delay: null,
  }

}