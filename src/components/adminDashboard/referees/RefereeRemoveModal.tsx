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
import {User} from "entities/User";
import {refereeItem} from "./RefereeListItem";
import {useLeagueUsers} from "hooks/useLeagueUsers";
import {Role} from "utils/Role";
import {useEffect} from "react";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  referee: User;
}

export const RefereeRemoveModal = (props: Props) => {
  const { removeMutation } = useLeagueUsers(Role.Referee);

  const deleteReferee = () => {
    removeMutation.mutate(props.referee.id);
  }

  useEffect(() => {
    if (removeMutation.isSuccess) {
      props.onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeMutation.isSuccess]);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove referee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Are you sure you want to remove the following referee from this league?
            </Text>
            <Flex
              p={5}
              borderRadius={10}
              alignItems={'center'}
              backgroundColor={'gray.50'}
            >
              {refereeItem(props.referee)}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={deleteReferee} isLoading={removeMutation.isLoading} ml={3}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}