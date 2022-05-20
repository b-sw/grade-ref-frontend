import {Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import {LeagueDeleteModal} from "./LeagueDeleteModal";
import {uuid} from "../../../shared/uuid";
import { useParams } from 'react-router-dom';

export const AdminSettingsPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  return (
    <Flex
      direction={'column'}
      borderRadius={10}
      p={5}
      backgroundColor={'gray.300'}
      shadow={'md'}
      overflowY={'hidden'}
      flexShrink={0}
    >
      <Flex mb={4}>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          Settings
        </Text>
      </Flex>

      <Box>
        <LeagueDeleteModal isOpen={isOpen} onClose={onClose} leagueId={leagueId!} />
        <Button onClick={onOpen}>Delete league</Button>
      </Box>
    </Flex>
  );
};
