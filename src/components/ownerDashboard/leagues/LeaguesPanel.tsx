import {Button, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {LeagueCreateModal} from "./LeagueCreateModal";
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {LeagueListItem} from "./LeagueListItem";
import {useLeagues} from "../../../hooks/useLeagues";
import {League} from "../../../entities/League";

export const LeaguesPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query: leaguesQuery } = useLeagues();

  return (
    <>
      <LeagueCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
      <Flex
        direction={'column'}
        borderRadius={10}
        p={5}
        backgroundColor={'gray.300'}
        shadow={'md'}
        overflowY={'hidden'}
        flexGrow={1}
        h={'50%'}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Leagues
          </Text>
          <Spacer />
          <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
            Add
          </Button>
        </Flex>

        <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
          {leaguesQuery.data &&
            leaguesQuery.data.map((league: League) =>
              <LeagueListItem key={league.id} league={league} />
            )}
        </Flex>
      </Flex>
    </>
  );
}