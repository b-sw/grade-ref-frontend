import dayjs from 'dayjs';
import { Match } from 'entities/Match';
import { Constants } from 'utils/Constants';
import { getGradeInfo } from 'entities/utils/gradeInfo';
import { v4 as randomUuid } from 'uuid';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { MatchInfo } from 'entities/MatchInfo';
import { MatchEnriched } from 'entities/MatchEnriched';
import { uuid } from 'utils/uuid';
import { Team } from 'entities/Team';
import { User } from 'entities/User';

export enum MatchStatus {
    Past = 'Past',
    GradeOverdue = 'Grade overdue',
    Upcoming = 'Upcoming',
}

export const getMatchStatus = (match: Match | MatchInfo): MatchStatus => {
    if (dayjs(match.matchDate, Constants.DATETIME_FORMAT).toDate().getTime() < Date.now()) {
        if (!match.refereeGrade || !match.overallGrade) {
            return MatchStatus.GradeOverdue;
        }
        return MatchStatus.Past;
    } else {
        return MatchStatus.Upcoming;
    }
};

export const enrichGradeAndStatus = (match: Match | MatchInfo): MatchEnriched | MatchInfoEnriched => {
    return {
        ...match,
        gradeStatus: getGradeInfo(match),
        matchStatus: getMatchStatus(match),
    };
};

export const enrichMatch = (match: Match): MatchEnriched => {
    return enrichGradeAndStatus(match) as MatchEnriched;
};

export const enrichMatchInfo = (match: MatchInfo): MatchInfoEnriched => {
    return enrichGradeAndStatus(match) as MatchInfoEnriched;
};

export const enrichMatchDto = (dto: Partial<Match>, index: number): MatchEnriched => {
    const match = enrichMatch(dto as Match);
    match.id = randomUuid();
    match.userReadableKey = String(index);
    return match as MatchEnriched;
};

export const getMatchInfoEnriched = (
    match: MatchEnriched,
    teams: { [key: uuid]: Team },
    referees: { [key: uuid]: User },
    observers: { [key: uuid]: User },
): MatchInfoEnriched => {
    return {
        id: match.id,
        userReadableKey: match.userReadableKey,
        matchDate: match.matchDate,
        stadium: match.stadium,
        homeTeamId: match.homeTeamId,
        awayTeamId: match.awayTeamId,
        referee: referees[match.refereeId].firstName + ' ' + referees[match.refereeId].lastName,
        observer: observers[match.observerId].firstName + ' ' + observers[match.observerId].lastName,
        refereeGrade: match.refereeGrade,
        refereeGradeDate: match.refereeGradeDate,
        refereeNote: match.refereeNote,
        overallGrade: match.overallGrade,
        overallGradeDate: match.overallGradeDate,
        observerReportKey: match.observerReportKey,
        mentorReportKey: match.mentorReportKey,
        tvReportKey: match.tvReportKey,
        matchStatus: match.matchStatus,
        gradeStatus: match.gradeStatus,
    };
};
