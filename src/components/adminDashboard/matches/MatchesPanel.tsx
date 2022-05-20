import {Button, Flex, Spacer, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {Match} from "../../../entities/Match";
import {MatchListItem} from "./MatchListItem";
import {useMatches} from "../../../hooks/useMatches";
import {MatchCreateModal} from "./MatchCreateModal";
import {useTeams} from "../../../hooks/useTeams";
import {Constants} from "../../../shared/Constants";
import dayjs from 'dayjs';
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";

export const MatchesPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query: matchesQuery } = useMatches();
  const { leagueUsersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { leagueUsersQuery: observersQuery } = useLeagueUsers(Role.Observer);
  const { query: teamsQuery } = useTeams();

  if (refereesQuery.isLoading || observersQuery.isLoading || teamsQuery.isLoading) {
    return (
      <>
        <Spinner />
      </>
    )
  }

  return (
    <>
      <MatchCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
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
            Matches
          </Text>
          <Spacer />
          <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
            Add
          </Button>
        </Flex>

        <Tabs display='flex' flexDirection='column' isFitted variant='line' overflowY={'hidden'}>
          <TabList>
            <Tab>Past</Tab>
            <Tab>Upcoming</Tab>
          </TabList>
          <TabPanels overflowY={'scroll'} css={scrollbarStyle}>
            <TabPanel>
              <Flex direction={'column'} gap={2}>
                {matchesQuery.data &&
                  matchesQuery.data
                    .filter((match: Match) => dayjs(match.date, Constants.DATETIME_FORMAT).toDate().getTime() < Date.now())
                    .map((match: Match) =>
                      <MatchListItem key={match.id} match={match} />
                    )}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction={'column'} gap={2}>
                {matchesQuery.data &&
                  matchesQuery.data
                    .filter((match: Match) => dayjs(match.date, Constants.DATETIME_FORMAT).toDate().getTime() >= Date.now())
                    .map((match: Match) =>
                    <MatchListItem key={match.id} match={match} />
                  )}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}