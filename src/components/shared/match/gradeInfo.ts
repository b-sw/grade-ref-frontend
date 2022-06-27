import dayjs, { Dayjs } from "dayjs";
import {GRADE_ADMISSION_TIME_WINDOW, Match, MATCH_DURATION_TIME} from "../../../entities/Match";

export enum GradeStatus {
  Received = 'Received',
  Overdue = 'Overdue',
  Expected = 'Expected',
  Pending = 'Pending',
}

export interface GradeInfo {
  status: GradeStatus;
  badgeScheme: string;
  delay: string | null;
}


export const getGradeInfo = (match: Match): GradeInfo => {
  const matchStart: Dayjs = dayjs(match.matchDate);
  const admissionEnd: Dayjs = dayjs(match.matchDate).add(GRADE_ADMISSION_TIME_WINDOW, 'hour');
  const now: Dayjs = dayjs();
  let dayDelay: number;
  let hourDelay: number;
  let minuteDelay: number;
  let gradeStatus: GradeStatus;
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
      gradeStatus = GradeStatus.Received;
      gradeBadgeScheme = 'green';
    } else {
      dayDelay = dayjs().diff(dayjs(admissionEnd), 'day');
      hourDelay = dayjs().diff(dayjs(admissionEnd), 'hour') % 24;
      minuteDelay = dayjs().diff(dayjs(admissionEnd), 'minute') % 60;
      gradeStatus = GradeStatus.Overdue;
      gradeBadgeScheme = 'red';
    }

    return {
      status: gradeStatus,
      badgeScheme: gradeBadgeScheme,
      delay: (dayDelay > 0 ? dayDelay + 'd' : '') + (hourDelay > 0 ? hourDelay + 'h' : '') + (minuteDelay > 0 ? minuteDelay + 'm' : '')
    }
  }

  if (matchStart.add(GRADE_ADMISSION_TIME_WINDOW, 'hour') > now) {
    return {
      status: GradeStatus.Expected,
      badgeScheme: 'gray',
      delay: null,
    }
  }

  return {
    status: GradeStatus.Pending,
    badgeScheme: 'orange',
    delay: null,
  }

}