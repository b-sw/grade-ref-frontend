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
import {User} from "entities/User";
import {useUsers} from "hooks/useUsers";
import {observerItem} from "components/owner/observers/ObserverListItem";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  observer: User;
}

export const ObserverDeleteModal = (props: Props) => {
  const { deleteMutation } = useUsers();

  const deleteObserver = () => {
    deleteMutation.mutate(props.observer.id);
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
            <Button colorScheme='red' onClick={deleteObserver} isLoading={deleteMutation.isLoading} ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}