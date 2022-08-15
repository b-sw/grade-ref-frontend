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
import { User } from 'entities/User';
import { observerItem } from 'components/admin/observers/ObserverListItem';
import { useLeagueUsers } from 'hooks/useLeagueUsers';
import { Role } from 'utils/Role';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  observer: User;
}

export const ObserverRemoveModal = (props: Props) => {
  const { removeMutation } = useLeagueUsers(Role.Observer);
  const { t } = useTranslation();

  const deleteObserver = () => {
    removeMutation.mutate(props.observer.id);
  };

  useEffect(() => {
    if (removeMutation.isSuccess) {
      props.onClose();
    }
  }, [removeMutation.isSuccess]);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('observers.remove')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              {t('observers.removeConfirm')}
            </Text>
            <Flex p={5} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
              {observerItem(props.observer, t)}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.onClose}>{t('modal.cancel')}</Button>
            <Button colorScheme="red" onClick={deleteObserver} isLoading={removeMutation.isLoading} ml={3}>
              {t('modal.remove')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
