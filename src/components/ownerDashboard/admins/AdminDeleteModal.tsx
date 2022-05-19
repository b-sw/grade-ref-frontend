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
import {useUsers} from "../../../hooks/useUsers";
import {adminItem} from "./AdminListItem";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  admin: User;
}

export const AdminDeleteModal = (props: Props) => {
  const { deleteMutation } = useUsers();

  const deleteAdmin = () => {
    deleteMutation.mutate(props.admin.id);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Are you sure you want to delete the following admin?
            </Text>
            {adminItem(props.admin)}
            <Text fontWeight='bold' mt='1rem'>
              You can't undo this action afterwards.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={deleteAdmin} isLoading={deleteMutation.isLoading} ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}