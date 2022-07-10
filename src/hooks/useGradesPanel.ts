import {uuid} from "utils/uuid";
import {User} from "entities/User";
import {Team} from "entities/Team";
import {useSetState} from "./useSetState";
import {Match} from "entities/Match";
import {matchFilter} from "components/shared/filters";
import {useEffect} from "react";
import { UseQueryResult } from "react-query";

export interface State {
  matches: Match[];
  referees: { [id: uuid]: User };
  observers: { [id: uuid]: User };
  filter: string;
}

export interface Props {
  matches: Match[] | undefined;
  teamsQuery: UseQueryResult<Team[]>;
  observersQuery: UseQueryResult<User[]>;
  refereesQuery: UseQueryResult<User[]>;
}

export const useGradesPanel = (props: Props) => {
  let referees: { [id: uuid]: User } = {};
  let observers: { [id: uuid]: User } = {};
  let teams: { [id: uuid]: Team } = {};

  props.refereesQuery.data!.forEach((referee) => referees[referee.id] = referee);
  props.observersQuery.data!.forEach((observer) => observers[observer.id] = observer);
  props.teamsQuery.data!.forEach((team) => teams[team.id] = team);


  const [state, setState] = useSetState({
    matches: [],
    referees: {},
    observers: {},
    filter: '',
  } as State);

  useEffect(() => {
    if (props.observersQuery.isSuccess) {
      let mappedObservers: { [id: uuid]: User } = {};
      props.observersQuery.data!.forEach((observer) => mappedObservers[observer.id] = observer);
      setState({ observers: mappedObservers } as State);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.observersQuery.data]);

  useEffect(() => {
    if (props.refereesQuery.isSuccess) {
      let mappedReferees: { [id: uuid]: User } = {};
      props.refereesQuery.data!.forEach((referee) => mappedReferees[referee.id] = referee);
      setState({ referees: mappedReferees } as State);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.refereesQuery.data]);

  useEffect(() => {
    const filteredMatches: Match[] = props.matches ? matchFilter(props.matches, teams, referees, observers, state.filter) : [];
    setState({matches: filteredMatches});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filter, state.observers, props.matches]);

  return { state, setState }
}