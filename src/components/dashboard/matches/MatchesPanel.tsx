import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
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

  return (
    <>
      {!readOnly && <MatchCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />}
      {!readOnly && <MatchesUploadModal isOpen={isUploadModalOpen} onClose={onUploadModalClose} />}
      <Flex
        direction={'column'}
        borderRadius={10}
        p={5}
        backgroundColor={'gray.300'}
        shadow={'md'}
        overflowY={'hidden'}
        flexGrow={1}
        maxH={['90vh', '100%']}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            {t('match_many')}
          </Text>
          <Spacer />
          {!readOnly && (
            <>
              <Button variant={'ghost'} leftIcon={<AttachmentIcon />} onClick={onUploadModalOpen}>
                {t('matches.upload')}
              </Button>
              <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
                {t('matches.add')}
              </Button>
            </>
          )}
        </Flex>

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
          <Tabs
            display="flex"
            flexDirection="column"
            isFitted
            variant="solid-rounded"
            overflowY={'hidden'}
            colorScheme="tabsButton"
            h={'100%'}
          >
            <TabList mx={5} my={2} gap={5}>
              <Tab>{t('matches.upcoming')}</Tab>
              <Tab>{t('matches.past')}</Tab>
              <Tab>{t('matches.gradeOverdue')}</Tab>
            </TabList>
            <TabPanels overflowY={'scroll'} h={'100%'}>
              <TabPanel display={'flex'} flexDirection={'column'} gap={2} h={'100%'}>
                {getFilteredMatches(MatchStatus.Upcoming).length
                  ? getFilteredMatches(MatchStatus.Upcoming).map((match) => (
                      <MatchListItem key={match.id} match={match} />
                    ))
                  : NoRecords(t('noRecords'))}
              </TabPanel>
              <TabPanel display={'flex'} flexDirection={'column'} gap={2} h={'100%'}>
                {getFilteredMatches(MatchStatus.Past).length
                  ? getFilteredMatches(MatchStatus.Past).map((match) => <MatchListItem key={match.id} match={match} />)
                  : NoRecords(t('noRecords'))}
              </TabPanel>
              <TabPanel display={'flex'} flexDirection={'column'} gap={2} h={'100%'}>
                {getFilteredMatches(MatchStatus.GradeOverdue).length
                  ? getFilteredMatches(MatchStatus.GradeOverdue).map((match) => (
                      <MatchListItem key={match.id} match={match} />
                    ))
                  : NoRecords(t('noRecords'))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Flex>
    </>
  );
};
