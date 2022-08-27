import { Input, InputGroup, InputLeftElement, Tab, TabPanel } from '@chakra-ui/react';
import { GradeSummaryHeading } from 'components/dashboard/grades/GradeSummaryHeading';
import { GradeListItem } from 'components/dashboard/grades/GradeListItem';
import { Role } from 'utils/Role';
import { MdSearch } from 'react-icons/md';
import { useStore } from 'zustandStore/store';
import { State, useGradesPanel } from 'hooks/useGradesPanel';
import { useUserMatches } from 'hooks/useUserMatches';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { GradeStatus } from 'entities/utils/gradeInfo';
import { NoRecords } from 'components/utils/NoRecords';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useTranslation } from 'react-i18next';
import { Panel } from 'components/generic/Panel';
import { TabList } from 'components/generic/TabList';
import { TabPanels } from 'components/generic/TabPanels';
import { Tabs } from 'components/generic/Tabs';
import { TabPanelDefaultProps } from 'components/generic/default-props';

interface Props {
    matches: MatchInfoEnriched[];
}

export const GradesPanel = (props: Props) => {
    const { query: matchesQuery } = useUserMatches();
    const { query: teamsQuery } = useLeagueTeams();
    const { t } = useTranslation();

    const { state, setState } = useGradesPanel({
        matches: props.matches,
        teamsQuery: teamsQuery,
    });

    return (
        <>
            <Panel headerTitle={t('grades.title')}>
                <GradesPanelBody matches={matchesQuery.data!} state={state} setState={setState} />
            </Panel>
        </>
    );
};

interface GradesPanelBodyProps {
    matches: MatchInfoEnriched[];
    state: State;
    setState: (state: Partial<State>) => void;
    readOnly?: boolean;
    showReferee?: boolean;
}

export const GradesPanelBody = (props: GradesPanelBodyProps) => {
    const user = useStore((state) => state.user);
    const showReferee: boolean = props.showReferee || user.role === Role.Observer;
    const { t } = useTranslation();

    const getFilteredGrades = (status: GradeStatus): MatchInfoEnriched[] => {
        return props.state.matches.filter((match) => match.gradeStatus.status === status);
    };

    const getFilteredGradesTabPanel = (gradeStatus: GradeStatus) => {
        const filteredGrades = getFilteredGrades(gradeStatus);
        return (
            <TabPanel {...TabPanelDefaultProps}>
                {filteredGrades.length
                    ? filteredGrades.map((match) => (
                          <GradeListItem
                              key={match.id}
                              readOnly={props.readOnly ?? user.role !== Role.Observer}
                              match={match}
                              userFullName={showReferee ? match.referee : match.observer}
                              userRole={showReferee ? Role.Referee : Role.Observer}
                          />
                      ))
                    : NoRecords(t('noRecords'))}
            </TabPanel>
        );
    };

    return (
        <>
            <GradeSummaryHeading matches={props.matches} />

            <InputGroup>
                <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
                <Input
                    placeholder={t('matches.searchMatch')}
                    onChange={(event) => props.setState({ filter: event.target.value })}
                />
            </InputGroup>

            <Tabs>
                <TabList>
                    <Tab>{t('grades.all')}</Tab>
                    <Tab>{t('grades.received')}</Tab>
                    <Tab>{t('grades.overdue')}</Tab>
                    <Tab>{t('grades.pending')}</Tab>
                    <Tab>{t('grades.expected')}</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel {...TabPanelDefaultProps}>
                        {props.state.matches.length
                            ? props.state.matches.map((match) => (
                                  <GradeListItem
                                      key={match.id}
                                      readOnly={props.readOnly ?? user.role !== Role.Observer}
                                      match={match}
                                      userFullName={showReferee ? match.referee : match.observer}
                                      userRole={showReferee ? Role.Referee : Role.Observer}
                                  />
                              ))
                            : NoRecords(t('noRecords'))}
                    </TabPanel>
                    {getFilteredGradesTabPanel(GradeStatus.Received)}
                    {getFilteredGradesTabPanel(GradeStatus.Overdue)}
                    {getFilteredGradesTabPanel(GradeStatus.Pending)}
                    {getFilteredGradesTabPanel(GradeStatus.Expected)}
                </TabPanels>
            </Tabs>
        </>
    );
};
