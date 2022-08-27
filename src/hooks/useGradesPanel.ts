import { uuid } from 'utils/uuid';
import { Team } from 'entities/Team';
import { useSetState } from './useSetState';
import { matchFilterByTeam } from 'components/utils/filters';
import { useEffect } from 'react';
import { UseQueryResult } from 'react-query';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';

export interface State {
    matches: MatchInfoEnriched[];
    filter: string;
}

export interface Props {
    matches: MatchInfoEnriched[] | undefined;
    teamsQuery: UseQueryResult<Team[]>;
}

export const useGradesPanel = (props: Props) => {
    const teams: { [id: uuid]: Team } = {};
    props.teamsQuery.data?.forEach((team) => (teams[team.id] = team));

    const [state, setState] = useSetState({
        matches: [],
        filter: '',
    } as State);

    useEffect(() => {
        const filteredMatches: MatchInfoEnriched[] = props.matches
            ? matchFilterByTeam(props.matches, teams, state.filter)
            : [];
        setState({ matches: filteredMatches });
    }, [state.filter, props.matches]);

    return { state, setState };
};
