import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react';

export interface Props {
  onClose: () => void,
  isOpen: boolean
}

export const LoginFailureModal = (props: Props) => {
  return (
    <>
      <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User is not registered</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            If you believe this is an error then please contact <b>help@graderef.com</b>.
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}