import {Button, Flex, Spacer, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {Match} from "../../../entities/Match";
import {AdminMatchListItem} from "./AdminMatchListItem";
import {useMatches} from "../../../hooks/useMatches";
import {AdminMatchCreateModal} from "./AdminMatchCreateModal";
import {useUsers} from "../../../hooks/useUsers";
import {useTeams} from "../../../hooks/useTeams";
import {Constants} from "../../../other/Constants";
import dayjs from 'dayjs';

export const AdminMatchesPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query: matchesQuery } = useMatches();
  const { refereesQuery, observersQuery } = useUsers();
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
      <AdminMatchCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
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
                      <AdminMatchListItem key={match.id} match={match} />
                    )}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction={'column'} gap={2}>
                {matchesQuery.data &&
                  matchesQuery.data
                    .filter((match: Match) => dayjs(match.date, Constants.DATETIME_FORMAT).toDate().getTime() >= Date.now())
                    .map((match: Match) =>
                    <AdminMatchListItem key={match.id} match={match} />
                  )}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}