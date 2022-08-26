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
import { Team } from 'entities/Team';
import { teamItem } from 'components/admin/teams/TeamListItem';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface Props {
    isOpen: boolean;
    onClose: () => void;
    team: Team;
}

export const TeamDeleteModal = (props: Props) => {
    const { deleteMutation } = useLeagueTeams();
    const { t } = useTranslation();

    const deleteTeam = () => {
        deleteMutation.mutate(props.team.id);
    };

    useEffect(() => {
        if (deleteMutation.isSuccess) {
            props.onClose();
        }
    }, [deleteMutation.isSuccess]);

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t('teams.delete')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight="bold" mb="1rem">
                            {t('teams.deleteConfirm')}
                        </Text>
                        <Flex p={5} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
                            {teamItem(props.team)}
                        </Flex>
                        <Text fontWeight="bold" mt="1rem">
                            {t('teams.deleteWarning')}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={props.onClose}>{t('modal.cancel')}</Button>
                        <Button colorScheme="red" onClick={deleteTeam} isLoading={deleteMutation.isLoading} ml={3}>
                            {t('modal.delete')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
