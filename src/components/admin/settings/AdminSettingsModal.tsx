import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { LeagueDeleteModal } from 'components/admin/settings/LeagueDeleteModal';
import { uuid } from 'utils/uuid';
import { useParams } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSettingsModal = (props: Props) => {
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>League settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <LeagueDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} leagueId={leagueId!} />
            <Button onClick={onDeleteModalOpen}>Delete league</Button>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
