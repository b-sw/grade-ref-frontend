import {Box, Button, Divider, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {Team} from "../../../entities/Team";
import {TeamListItem} from "./TeamListItem";
import {useTeams} from "../../../hooks/useTeams";
import {TeamCreateModal} from "./TeamCreateModal";

export const TeamsPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query: teamsQuery } = useTeams();

  return (
    <>
      <TeamCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
      <Flex
        direction={'column'}
        borderRadius={10}
        backgroundColor={'gray.750'}
        p={7}
        shadow={'dark-lg'}
        overflowY={'hidden'}
        flexGrow={1}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Teams
          </Text>
          <Spacer />
          <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
            Add
          </Button>
        </Flex>

        <Box overflowY={'scroll'} css={scrollbarStyle}>
          {teamsQuery.data &&
            teamsQuery.data.map((team: Team, i: number) => (
              <div key={team.id}>
                <TeamListItem team={team} />
                {i < teamsQuery.data.length - 1 && <Divider />}
              </div>
            ))}
        </Box>
      </Flex>
    </>
  );
}