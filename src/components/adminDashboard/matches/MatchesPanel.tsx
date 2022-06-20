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
  useDisclosure
} from '@chakra-ui/react';
import {AddIcon, AttachmentIcon} from '@chakra-ui/icons';
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {Match} from "../../../entities/Match";
import {MatchListItem} from "./MatchListItem";
import {MatchCreateModal} from "./MatchCreateModal";
import {useSetState} from "../../../hooks/useSetState";
import {matchFilter} from "../../shared/filters";
import {useEffect} from "react";
import {MdSearch} from 'react-icons/md';
import {useLeagueTeams} from "../../../hooks/useLeagueTeams";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";
import {uuid} from "../../../shared/uuid";
import {User} from "../../../entities/User";
import {Team} from "../../../entities/Team";
import {isPastAdmissionWindow} from "../../shared/MatchGradeListItem";
import {MatchStatus} from "../../shared/matchStatus";
import {noRecords} from "../../shared/panelUtils";
import { MatchesUploadModal } from './MatchesUploadModal';

interface State {
  matches: Match[];
  filter: string;
}

interface Props {
  matches: Match[];
  readOnly?: boolean;
  hideTabs?: boolean;
}

export const MatchesPanel = (props: Props) => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { isOpen: isUploadModalOpen, onOpen: onUploadModalOpen, onClose: onUploadModalClose } = useDisclosure();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  let referees: { [id: uuid]: User } = {};
  let observers: { [id: uuid]: User } = {};
  let teams: { [id: uuid]: Team } = {};

  refereesQuery.data!.forEach((referee) => referees[referee.id] = referee);
  observersQuery.data!.forEach((observer) => observers[observer.id] = observer);
  teamsQuery.data!.forEach((team) => teams[team.id] = team);

  const [state, setState] = useSetState({
    matches: [],
    filter: '',
  } as State);

  useEffect(() => {
    const filteredMatches: Match[] = matchFilter(props.matches, teams, referees, observers, state.filter);
    setState({ matches: filteredMatches });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filter, props.matches]);

  const getFilteredMatches = (status: MatchStatus): Match[] => {
    return state.matches.filter((match: Match) => match.matchStatus === status);
  }

  return (
    <>
      {!props.readOnly && <MatchCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />}
      {!props.readOnly && <MatchesUploadModal isOpen={isUploadModalOpen} onClose={onUploadModalClose} />}
      <Flex
        direction={'column'}
        borderRadius={10}
        p={5}
        backgroundColor={'gray.300'}
        shadow={'md'}
        overflowY={'hidden'}
        flexGrow={1}
        maxH={['70vh', '100%']}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Matches
          </Text>
          <Spacer />
          {!props.readOnly &&
            <>
              <Button variant={'ghost'} leftIcon={<AttachmentIcon />} onClick={onUploadModalOpen}>
                  Load
              </Button>
              <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
                  Add
              </Button>
            </>}
        </Flex>

        <InputGroup>
          <InputLeftElement
            pointerEvents={'none'}
            children={<MdSearch />}
          />
          <Input
            mb={2}
            placeholder={'Search match'}
            onChange={(event) => setState({ filter: event.target.value })}
          />
        </InputGroup>

        {props.hideTabs ?
          <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle} h={'100%'}>
            {state.matches.length ?
              state.matches.map((match: Match) =>
                <MatchListItem key={match.id} readOnly={props.readOnly || isPastAdmissionWindow(match)} match={match} />)
              :
              noRecords()
            }
          </Flex>
          :
          <Tabs display='flex' flexDirection='column' isFitted variant='solid-rounded' overflowY={'hidden'} colorScheme='tabsButton' h={'100%'}>
            <TabList mx={5} my={2} gap={5}>
              <Tab>Past</Tab>
              <Tab>Upcoming</Tab>
            </TabList>
            <TabPanels overflowY={'scroll'} css={scrollbarStyle} h={'100%'}>
              <TabPanel display={'flex'} flexDirection={'column'} gap={2} h={'100%'}>
                {getFilteredMatches(MatchStatus.Past).length ?
                  getFilteredMatches(MatchStatus.Past).map((match: Match) =>
                    <MatchListItem key={match.id} readOnly={props.readOnly || isPastAdmissionWindow(match)} match={match} />)
                  :
                  noRecords()
                }
              </TabPanel>
              <TabPanel display={'flex'} flexDirection={'column'} gap={2} h={'100%'}>
                {getFilteredMatches(MatchStatus.Upcoming).length ?
                  getFilteredMatches(MatchStatus.Past).map((match: Match) =>
                    <MatchListItem key={match.id} readOnly={props.readOnly} match={match} />)
                  :
                  noRecords()
                }
              </TabPanel>
            </TabPanels>
          </Tabs>
        }
      </Flex>
    </>
  );
}