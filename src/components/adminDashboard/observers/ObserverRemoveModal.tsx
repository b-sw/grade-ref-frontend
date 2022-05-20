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
import {User} from "../../../entities/User";
import {observerItem} from "./ObserverListItem";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  observer: User;
}

export const ObserverRemoveModal = (props: Props) => {
  const { removeMutation } = useLeagueUsers(Role.Observer);

  const deleteObserver = () => {
    removeMutation.mutate(props.observer.id);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete observer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Are you sure you want to delete the following observer?
            </Text>
            {observerItem(props.observer)}
            <Text fontWeight='bold' mt='1rem'>
              You can't undo this action afterwards.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={deleteObserver} isLoading={removeMutation.isLoading} ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}