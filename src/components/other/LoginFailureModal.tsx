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
import { useDisclosure } from "@chakra-ui/react"

export interface Props {
  userEmail: string
}

export const LoginFailureModal = (/*props: Props*/) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const modal = (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User is not registered</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            If you believe this is an error then please contact <b>graderef@gmail.com</b>.
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  return { onOpen, modal }
}