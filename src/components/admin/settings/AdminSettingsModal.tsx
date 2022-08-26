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
    useDisclosure,
} from '@chakra-ui/react';
import { LeagueDeleteModal } from 'components/admin/settings/LeagueDeleteModal';
import { uuid } from 'utils/uuid';
import { useParams } from 'react-router-dom';
import { changeLanguageSection } from 'components/explorer/LanguageSettingsModal';
import { useTranslation } from 'react-i18next';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AdminSettingsModal = (props: Props) => {
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { leagueId } = useParams<{ leagueId: uuid }>();
    const { i18n, t } = useTranslation();

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('settingsModal.title')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {changeLanguageSection(i18n, t)}
                    <Flex gap={2} direction={'column'}>
                        <LeagueDeleteModal
                            isOpen={isDeleteModalOpen}
                            onClose={onDeleteModalClose}
                            leagueId={leagueId!}
                        />
                        <Text fontWeight={'medium'}>{t('league.title')}</Text>
                        <Button onClick={onDeleteModalOpen} w={['auto', '30%']}>
                            {t('settingsModal.deleteLeague')}
                        </Button>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.onClose}>{t('modal.close')}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
