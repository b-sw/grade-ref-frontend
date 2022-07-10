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
import {refereeItem} from "./RefereeListItem";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  referee: User;
}

export const RefereeDeleteModal = (props: Props) => {
  const { deleteMutation } = useUsers();

  const deleteReferee = () => {
    deleteMutation.mutate(props.referee.id);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete referee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Are you sure you want to delete the following referee?
            </Text>
            {refereeItem(props.referee)}
            <Text fontWeight='bold' mt='1rem'>
              You can't undo this action afterwards.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={deleteReferee} isLoading={deleteMutation.isLoading} ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}