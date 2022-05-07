import {Button, Flex, Spacer, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {Match} from "../../../entities/Match";
import {AdminMatchListItem} from "./AdminMatchListItem";
import {useMatches} from "../../../hooks/useMatches";
import {AdminMatchCreateModal} from "./AdminMatchCreateModal";
import {useUsers} from "../../../hooks/useUsers";
import {useTeams} from "../../../hooks/useTeams";

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
        backgroundColor={'gray.200'}
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

        <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
          {matchesQuery.data &&
            matchesQuery.data.map((match: Match) =>
              <AdminMatchListItem key={match.id} match={match} />
            )}
        </Flex>
      </Flex>
    </>
  );
}