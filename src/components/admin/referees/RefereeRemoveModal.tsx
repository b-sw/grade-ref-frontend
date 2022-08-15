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
import { refereeItem } from 'components/admin/referees/RefereeListItem';
import { useLeagueUsers } from 'hooks/useLeagueUsers';
import { Role } from 'utils/Role';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  referee: User;
}

export const RefereeRemoveModal = (props: Props) => {
  const { removeMutation } = useLeagueUsers(Role.Referee);
  const { t } = useTranslation();

  const deleteReferee = () => {
    removeMutation.mutate(props.referee.id);
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
          <ModalHeader>{t('referees.remove')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              {t('referees.removeConfirm')}
            </Text>
            <Flex p={5} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
              {refereeItem(props.referee, t)}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.onClose}>{t('modal.cancel')}</Button>
            <Button colorScheme="red" onClick={deleteReferee} isLoading={removeMutation.isLoading} ml={3}>
              {t('modal.remove')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
