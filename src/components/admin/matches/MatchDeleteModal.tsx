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
import { matchItem } from 'components/dashboard/matches/MatchListItem';
import { useLeagueMatches } from 'hooks/useLeagueMatches';
import { Path } from 'utils/Path';
import { uuid } from 'utils/uuid';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from 'zustandStore/store';
import { Role } from 'utils/Role';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { useTranslation } from 'react-i18next';

export interface MatchDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    match: MatchInfoEnriched;
}

export const MatchDeleteModal = ({ isOpen, onClose, match }: MatchDeleteModalProps) => {
    const user = useStore((state) => state.user);
    const { deleteMutation } = useLeagueMatches();
    const { query: teamsQuery } = useLeagueTeams();
    const { t } = useTranslation();

    const navigate: NavigateFunction = useNavigate();
    const { leagueId } = useParams<{ leagueId: uuid }>();

    const deleteMatch = () => {
        deleteMutation.mutate(match.id);
    };

    const userIsAdmin = user.role === Role.Admin;

    useEffect(() => {
        if (deleteMutation.isSuccess) {
            onClose();
            const dashboardPath = userIsAdmin ? Path.ADMIN_DASHBOARD : Path.DASHBOARD;
            navigate(`${dashboardPath}/${leagueId}`);
        }
    }, [deleteMutation.isSuccess]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={'3xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t('matches.deleteModal.title')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight="bold" mb="1rem">
                            {t('matches.deleteModal.confirm')}
                        </Text>
                        <Flex p={5} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
                            {matchItem(match, teamsQuery.data!, navigate, leagueId!, true)}
                        </Flex>
                        <Text fontWeight="bold" mt="1rem">
                            {t('matches.deleteModal.warning')}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>{t('modal.cancel')}</Button>
                        <Button colorScheme="red" onClick={deleteMatch} isLoading={deleteMutation.isLoading} ml={3}>
                            {t('modal.delete')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
