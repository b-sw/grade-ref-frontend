import { Button, Flex, Input, InputGroup, InputLeftElement, Tab, TabPanel, useDisclosure } from '@chakra-ui/react';
import { AddIcon, AttachmentIcon } from '@chakra-ui/icons';
import { MatchListItem } from 'components/dashboard/matches/MatchListItem';
import { MatchCreateModal } from 'components/admin/matches/MatchCreateModal';
import { useSetState } from 'hooks/useSetState';
import { matchFilterByTeam } from 'components/utils/filters';
import { useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { uuid } from 'utils/uuid';
import { Team } from 'entities/Team';
import { MatchStatus } from 'entities/utils/matchStatus';
import { NoRecords } from 'components/utils/NoRecords';
import { MatchesUploadModal } from 'components/admin/matches/MatchesUploadModal';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useTranslation } from 'react-i18next';
import { Panel } from 'components/generic/Panel';
import { Tabs } from 'components/generic/Tabs';
import { TabList } from 'components/generic/TabList';
import { TabPanels } from 'components/generic/TabPanels';
import { TabPanelDefaultProps } from 'components/generic/default-props';

interface State {
    matches: MatchInfoEnriched[];
    filter: string;
}

interface MatchesPanelProps {
    matches: MatchInfoEnriched[];
    readOnly?: boolean;
    hideTabs?: boolean;
}

export const MatchesPanel = ({ matches, readOnly, hideTabs }: MatchesPanelProps) => {
    const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
    const { isOpen: isUploadModalOpen, onOpen: onUploadModalOpen, onClose: onUploadModalClose } = useDisclosure();
    const { query: teamsQuery } = useLeagueTeams();
    const { t } = useTranslation();

    const teams: { [id: uuid]: Team } = {};
    teamsQuery.data!.forEach((team) => (teams[team.id] = team));

    const [state, setState] = useSetState({
        matches: [],
        filter: '',
    } as State);

    useEffect(() => {
        const filteredMatches: MatchInfoEnriched[] = matchFilterByTeam(matches, teams, state.filter);
        setState({ matches: filteredMatches });
    }, [state.filter, matches]);

    const getFilteredMatches = (status: MatchStatus): MatchInfoEnriched[] => {
        return state.matches.filter((match) => match.matchStatus === status);
    };

    const headerButtons = !readOnly && (
        <>
            <Button variant={'ghost'} leftIcon={<AttachmentIcon />} onClick={onUploadModalOpen} size={'lg'}>
                {t('matches.upload')}
            </Button>
            <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen} size={'lg'}>
                {t('matches.add')}
            </Button>
        </>
    );

    const getFilteredMatchesTabPanel = (matchStatus: MatchStatus) => {
        const filteredMatches = getFilteredMatches(matchStatus);
        return (
            <TabPanel {...TabPanelDefaultProps}>
                {filteredMatches.length
                    ? filteredMatches.map((match) => <MatchListItem key={match.id} match={match} />)
                    : NoRecords(t('noRecords'))}
            </TabPanel>
        );
    };

    return (
        <>
            {!readOnly && <MatchCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />}
            {!readOnly && <MatchesUploadModal isOpen={isUploadModalOpen} onClose={onUploadModalClose} />}
            <Panel headerTitle={t('match_many')} headerButtons={headerButtons}>
                <InputGroup>
                    <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
                    <Input
                        mb={2}
                        placeholder={t('matches.searchMatch')}
                        onChange={(event) => setState({ filter: event.target.value })}
                    />
                </InputGroup>

                {hideTabs ? (
                    <Flex direction={'column'} gap={2} overflowY={'scroll'} h={'100%'}>
                        {state.matches.length
                            ? state.matches.map((match) => <MatchListItem key={match.id} match={match} />)
                            : NoRecords(t('noRecords'))}
                    </Flex>
                ) : (
                    <Tabs>
                        <TabList>
                            <Tab>{t('matches.upcoming')}</Tab>
                            <Tab>{t('matches.past')}</Tab>
                            <Tab>{t('matches.gradeOverdue')}</Tab>
                        </TabList>
                        <TabPanels>
                            {getFilteredMatchesTabPanel(MatchStatus.Upcoming)}
                            {getFilteredMatchesTabPanel(MatchStatus.Past)}
                            {getFilteredMatchesTabPanel(MatchStatus.GradeOverdue)}
                        </TabPanels>
                    </Tabs>
                )}
            </Panel>
        </>
    );
};
