import {Button, Flex, Input, InputGroup, InputLeftElement, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {Team} from "../../../entities/Team";
import { MdSearch } from "react-icons/md";
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
        p={5}
        backgroundColor={'gray.300'}
        shadow={'md'}
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

        <InputGroup>
          <InputLeftElement
            pointerEvents={'none'}
            children={<MdSearch />}
          />
          <Input
            mb={5}
          />
        </InputGroup>

        <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
          {teamsQuery.data &&
            teamsQuery.data.map((team: Team) =>
              <TeamListItem key={team.id} team={team} />
            )}
        </Flex>
      </Flex>
    </>
  );
}