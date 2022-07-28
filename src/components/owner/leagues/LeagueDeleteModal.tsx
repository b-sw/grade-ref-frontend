import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { leagueItem } from 'components/owner/leagues/LeagueListItem';
import { League } from 'entities/League';
import { useLeagues } from 'hooks/useLeagues';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  league: League;
}

export const LeagueDeleteModal = (props: Props) => {
  const { deleteMutation } = useLeagues();

  const deleteLeague = () => {
    deleteMutation.mutate(props.league.id);
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete league</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Are you sure you want to delete the following league?
            </Text>
            <Flex p={5} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
              {leagueItem(props.league)}
            </Flex>
            <Text fontWeight="bold" mt="1rem">
              You can't undo this action afterwards.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button colorScheme="red" onClick={deleteLeague} isLoading={deleteMutation.isLoading} ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
