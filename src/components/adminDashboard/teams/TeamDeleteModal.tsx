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
import {Team} from "../../../entities/Team";
import {teamItem} from "./TeamListItem";
import {useTeams} from "../../../hooks/useTeams";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  team: Team;
}

export const TeamDeleteModal = (props: Props) => {
  const { deleteMutation } = useTeams();

  const deleteTeam = () => {
    deleteMutation.mutate(props.team.id);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Are you sure you want to delete the following team?
            </Text>
            {teamItem(props.team)}
            <Text fontWeight='bold' mt='1rem'>
              You can't undo this action afterwards.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={deleteTeam} isLoading={deleteMutation.isLoading} ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}