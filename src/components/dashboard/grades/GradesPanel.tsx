import { Flex, Input, InputGroup, InputLeftElement, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import {MatchGradeSummaryHeader} from "../../shared/MatchGradeSummaryHeader";
import {scrollbarStyle} from "../shared/styles";
import {MatchGradeListItem} from "../../shared/MatchGradeListItem";
import {Role} from "../../../shared/Role";
import {Match} from "../../../entities/Match";
import { MdSearch } from 'react-icons/md';
import useStore from "../../../zustand/store";
import {State, useGradesPanel} from "../../../hooks/useGradesPanel";
import {useUserMatches} from "../../../hooks/useUserMatches";
import {useLeagueTeams} from "../../../hooks/useLeagueTeams";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";

interface Props {
  matches: Match[];
}

export const GradesPanel = (props: Props) => {
  const { query: matchesQuery } = useUserMatches();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);

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
  return (
    <>
      <MatchGradeSummaryHeader matches={props.matches} />

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

      <Tabs display='flex' flexDirection='column' isFitted variant='solid-rounded' overflowY={'hidden'} colorScheme='tabsButton'>
        <TabList mx={5} mt={3} gap={5}>
          <Tab>All</Tab>
          <Tab>Received</Tab>
          <Tab>Overdue</Tab>
          <Tab>Pending</Tab>
          <Tab>Expected</Tab>
        </TabList>
        <TabPanels overflowY={'scroll'} css={scrollbarStyle}>
          <TabPanel>
            <Flex direction={'column'} gap={2}>
              {props.state.observers !== {} && props.state.matches.map((match) =>
                <MatchGradeListItem
                  key={match.id}
                  readOnly={props.readOnly ?? user.role !== Role.Observer}
                  match={match}
                  user={showReferee ? props.state.referees[match.refereeId] : props.state.observers[match.observerId]}
                />
              )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction={'column'} gap={2}>
              {props.state.observers !== {} && props.state.matches.map((match) =>
                <MatchGradeListItem
                  key={match.id}
                  readOnly={props.readOnly ?? user.role !== Role.Observer}
                  match={match}
                  user={showReferee ? props.state.referees[match.refereeId] : props.state.observers[match.observerId]}
                />
              )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction={'column'} gap={2}>
              {props.state.observers !== {} && props.state.matches.map((match) =>
                <MatchGradeListItem
                  key={match.id}
                  readOnly={props.readOnly ?? user.role !== Role.Observer}
                  match={match}
                  user={showReferee ? props.state.referees[match.refereeId] : props.state.observers[match.observerId]}
                />
              )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction={'column'} gap={2}>
              {props.state.observers !== {} && props.state.matches.map((match) =>
                <MatchGradeListItem
                  key={match.id}
                  readOnly={props.readOnly ?? user.role !== Role.Observer}
                  match={match}
                  user={showReferee ? props.state.referees[match.refereeId] : props.state.observers[match.observerId]}
                />
              )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction={'column'} gap={2}>
              {props.state.observers !== {} && props.state.matches.map((match) =>
                <MatchGradeListItem
                  key={match.id}
                  readOnly={props.readOnly ?? user.role !== Role.Observer}
                  match={match}
                  user={showReferee ? props.state.referees[match.refereeId] : props.state.observers[match.observerId]}
                />
              )}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/*<Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>*/}
      {/*  {props.state.observers !== {} && props.state.matches.map((match) =>*/}
      {/*    <MatchGradeListItem*/}
      {/*      key={match.id}*/}
      {/*      readOnly={props.readOnly ?? user.role !== Role.Observer}*/}
      {/*      match={match}*/}
      {/*      user={showReferee ? props.state.referees[match.refereeId] : props.state.observers[match.observerId]}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</Flex>*/}
    </>
  );
}