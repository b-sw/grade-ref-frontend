import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';
import {useUsers} from "../../../hooks/useUsers";
import {leagueItem} from "./LeagueListItem";
import {League} from "../../../entities/League";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  league: League;
}

export const LeagueDeleteModal = (props: Props) => {
  const { deleteMutation } = useUsers();

  const deleteLeague = () => {
    deleteMutation.mutate(props.league.id);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete league</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Are you sure you want to delete the following league?
            </Text>
            {leagueItem(props.league)}
            <Text fontWeight='bold' mt='1rem'>
              You can't undo this action afterwards.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={deleteLeague} isLoading={deleteMutation.isLoading} ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}