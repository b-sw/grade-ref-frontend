import { User } from 'entities/User';
import { Team } from 'entities/Team';
import { League } from 'entities/League';
import { uuid } from 'utils/uuid';
import { MatchEnriched } from 'entities/MatchEnriched';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';

export const userFilter = (initialUsers: User[], filter: string): User[] => {
    filter = filter.toLowerCase();
    return initialUsers.filter((user) => {
        const fullName: string = user.firstName + ' ' + user.lastName;
        return (
            fullName.toLowerCase().includes(filter) ||
            user.email.toLowerCase().includes(filter) ||
            user.phoneNumber.toLowerCase().includes(filter)
        );
    });
};

export const teamFilter = (initialTeams: Team[], filter: string): Team[] => {
    filter = filter.toLowerCase();
    return initialTeams.filter((team) => team.name.toLowerCase().includes(filter));
};

export const leagueFilter = (initialLeagues: League[], filter: string): League[] => {
    filter = filter.toLowerCase();
    return initialLeagues.filter(
        (league) =>
            league.name.toLowerCase().includes(filter) ||
            league.shortName.toLowerCase().includes(filter) ||
            league.country.toLowerCase().includes(filter),
    );
};

export const matchFilter = (
    initialMatches: MatchEnriched[],
    teams: { [id: uuid]: Team },
    referees: { [id: uuid]: User },
    observers: { [id: uuid]: User },
    filter: string,
): MatchEnriched[] => {
    filter = filter.toLowerCase();
    return initialMatches.filter((match) => {
        const homeTeam: Team = teams[match.homeTeamId];
        const awayTeam: Team = teams[match.awayTeamId];
        const referee: User = referees[match.refereeId];
        const observer: User = observers[match.observerId];

        const refereeFullName: string = referee.firstName + ' ' + referee.lastName;
        const observerFullName: string = observer.firstName + ' ' + observer.lastName;

        return (
            match.userReadableKey.toLowerCase().includes(filter) ||
            match.stadium.toLowerCase().includes(filter) ||
            homeTeam.name.toLowerCase().includes(filter) ||
            awayTeam.name.toLowerCase().includes(filter) ||
            refereeFullName.toLowerCase().includes(filter) ||
            observerFullName.toLowerCase().includes(filter)
        );
    });
};

export const matchFilterByTeam = (
    initialMatches: MatchInfoEnriched[],
    teams: { [id: uuid]: Team },
    filter: string,
): MatchInfoEnriched[] => {
    filter = filter.toLowerCase();
    return initialMatches.filter((match) => {
        const homeTeamName = teams[match.homeTeamId].name;
        const awayTeamName = teams[match.awayTeamId].name;
        return (
            match.userReadableKey.toLowerCase().includes(filter) ||
            match.stadium.toLowerCase().includes(filter) ||
            homeTeamName.toLowerCase().includes(filter) ||
            awayTeamName.toLowerCase().includes(filter)
        );
    });
};
