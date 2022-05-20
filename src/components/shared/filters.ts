import {User} from "../../entities/User";
import {Team} from "../../entities/Team";
import {League} from "../../entities/League";

export const userFilter = (initialUsers: User[], filter: string) => {
  filter = filter.toLowerCase();
  return initialUsers.filter((user) => {
    const fullName: string = user.firstName + ' ' + user.lastName;
    return user.firstName.toLowerCase().includes(filter) ||
      user.lastName.toLowerCase().includes(filter) ||
      fullName.toLowerCase().includes(filter) ||
      user.email.toLowerCase().includes(filter) ||
      user.phoneNumber.toLowerCase().includes(filter);
  });
}

export const teamFilter = (initialTeams: Team[], filter: string) => {
  filter = filter.toLowerCase();
  return initialTeams.filter((team) => (
    team.name.toLowerCase().includes(filter)
  ));
}

export const leagueFilter = (initialLeagues: League[], filter: string) => {
  filter = filter.toLowerCase();
  return initialLeagues.filter((league) => (
    league.name.toLowerCase().includes(filter) ||
    league.shortName.toLowerCase().includes(filter) ||
    league.country.toLowerCase().includes(filter)
  ));
}