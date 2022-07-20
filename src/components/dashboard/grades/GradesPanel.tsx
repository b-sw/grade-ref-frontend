import { Flex, Input, InputGroup, InputLeftElement, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import {GradeSummaryHeading} from "components/dashboard/grades/GradeSummaryHeading";
import {scrollbarStyle} from "../styles/styles";
import {GradeListItem} from "components/dashboard/grades/GradeListItem";
import {Role} from "utils/Role";
import {Match} from "entities/Match";
import { MdSearch } from 'react-icons/md';
import { useStore } from "zustandStore/store";
import {State, useGradesPanel} from "hooks/useGradesPanel";
import {useUserMatches} from "hooks/useUserMatches";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {useLeagueUsers} from "hooks/useLeagueUsers";
import {GradeStatus} from "entities/utils/gradeInfo";
import {NoRecords} from "components/utils/NoRecords";

interface Props {
  matches: Match[];
}

export const GradesPanel = (props: Props) => {
  const { query: matchesQuery } = useUserMatches();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  const { state, setState } = useGradesPanel({
    matches: props.matches,
    teamsQuery: teamsQuery,
    observersQuery: observersQuery,
    refereesQuery: refereesQuery
  });

  return (
    <>
      <Flex
        direction={'column'}
        borderRadius={10}
        p={5}
        backgroundColor={'gray.300'}
        shadow={'md'}
        overflowY={'hidden'}
        flexGrow={1}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Grades
          </Text>
          <Spacer />
        </Flex>

        <GradesPanelBody matches={matchesQuery.data!} state={state} setState={setState} />

      </Flex>
    </>
  );
}

interface GradesPanelBodyProps {
  matches: Match[];
  state: State;
  setState: (state: Partial<State>) => void;
  readOnly?: boolean;
  showReferee?: boolean;
}

export const GradesPanelBody = (props: GradesPanelBodyProps) => {
  const user = useStore((state) => state.user);
  const showReferee: boolean = props.showReferee || user.role === Role.Observer;

  const getFilteredGrades = (status: GradeStatus): Match[] => {
    return props.state.matches.filter((match) => match.gradeStatus.status === status);
  }

  return (
    <>
      <GradeSummaryHeading matches={props.matches} />

      <InputGroup>
        <InputLeftElement
          pointerEvents={'none'}
          children={<MdSearch />}
        />
        <Input
          placeholder={'Search match'}
          onChange={(event) => props.setState({ filter: event.target.value })}
        />
      </InputGroup>

      <Tabs display='flex' flexDirection='column' isFitted variant='solid-rounded' overflowY={'hidden'} colorScheme='tabsButton' h={'100%'}>
        <TabList mx={5} my={2} gap={5}>
          <Tab>All</Tab>
          <Tab>{GradeStatus.Received}</Tab>
          <Tab>{GradeStatus.Overdue}</Tab>
          <Tab>{GradeStatus.Pending}</Tab>
          <Tab>{GradeStatus.Expected}</Tab>
        </TabList>
        <TabPanels overflowY={'scroll'} css={scrollbarStyle} h={'100%'}>
          <TabPanel display='flex' flexDirection='column' gap={2} h={'100%'}>
            {props.state.matches.length ?
              props.state.matches.map((match) =>
                <GradeListItem
                  key={match.id}
                  readOnly={props.readOnly ?? user.role !== Role.Observer}
                  match={match}
                  user={showReferee ? props.state.referees[match.refereeId] : props.state.observers[match.observerId]}
                />)
              :
              NoRecords()
            }
          </TabPanel>
          <TabPanel display='flex' flexDirection='column' gap={2} h={'100%'}>
            {getFilteredGrades(GradeStatus.Received).length ?
              getFilteredGrades(GradeStatus.Received).map((match) =>
                <GradeListItem
                  key={match.id}
                  readOnly={props.readOnly ?? user.role !== Role.Observer}
                  match={match}
                  user={showReferee ? props.state.referees[match.refereeId] : props.state.observers[match.observerId]}
                />)
              :
              NoRecords()
            }
          </TabPanel>
          <TabPanel display='flex' flexDirection='column' gap={2} h={'100%'}>
            {getFilteredGrades(GradeStatus.Overdue).length ?
              getFilteredGrades(GradeStatus.Overdue).map((match) =>
                <GradeListItem
                  key={match.id}
                  readOnly={props.readOnly ?? user.role !== Role.Observer}
                  match={match}
                  user={showReferee ? props.state.referees[match.refereeId] : props.state.observers[match.observerId]}
                />)
              :
              NoRecords()
            }
          </TabPanel>
          <TabPanel display='flex' flexDirection='column' gap={2} h={'100%'}>
            {getFilteredGrades(GradeStatus.Pending).length ?
              getFilteredGrades(GradeStatus.Pending).map((match) =>
                <GradeListItem
                  key={match.id}
                  readOnly={props.readOnly ?? user.role !== Role.Observer}
                  match={match}
                  user={showReferee ? props.state.referees[match.refereeId] : props.state.observers[match.observerId]}
                />)
              :
              NoRecords()
            }
          </TabPanel>
          <TabPanel display='flex' flexDirection='column' gap={2} h={'100%'}>
            {getFilteredGrades(GradeStatus.Expected).length ?
              getFilteredGrades(GradeStatus.Expected).map((match) =>
                <GradeListItem
                  key={match.id}
                  readOnly={props.readOnly ?? user.role !== Role.Observer}
                  match={match}
                  user={showReferee ? props.state.referees[match.refereeId] : props.state.observers[match.observerId]}
                />)
              :
              NoRecords()
            }
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
