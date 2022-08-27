import {
    Button,
    Code,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { useLeagues } from 'hooks/useLeagues';
import { useLeagueMatches } from 'hooks/useLeagueMatches';
import { useSetState } from 'hooks/useSetState';
import { League } from 'entities/League';
import { uuid } from 'utils/uuid';
import { leagueItem } from 'components/admin/explorer/AdminLeagueCard';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    leagueId: uuid;
}

interface State {
    text: string;
}

export const LeagueDeleteModal = (props: Props) => {
    const { deleteMutation } = useLeagues();
    const { query: leaguesQuery } = useLeagues();
    const { query: matchesQuery } = useLeagueMatches();
    const [state, setState] = useSetState({
        text: '',
    } as State);
    const { t } = useTranslation();
    const safetyText = 'greedy marlin';

    const leagueIdx: number = leaguesQuery.data!.findIndex((l: League) => l.id === props.leagueId)!;
    const league: League = leaguesQuery.data![leagueIdx];

    const deleteLeague = () => {
        if (state.text !== safetyText) {
            return;
        }
        deleteMutation.mutate(props.leagueId);
    };

    useEffect(() => {
        if (deleteMutation.isSuccess) {
            props.onClose();
        }
    }, [deleteMutation.isSuccess]);

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('league.deleteModal.title')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        {matchesQuery.data && matchesQuery.data.length > 0
                            ? t('league.deleteModal.matchesWarning')
                            : t('league.deleteModal.questionWarning')}
                    </Text>
                    <Flex my={2} p={5} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
                        {leagueItem(league)}
                    </Flex>
                    <Text color={'red'}>{t('league.deleteModal.reverseWarning')}</Text>
                    <Text mt={5}>{t('league.deleteModal.confirm')}:</Text>
                    <Code my={2}>{safetyText}</Code>
                    <FormControl>
                        <FormLabel>{t('league.deleteModal.text')}</FormLabel>
                        <Input
                            value={state.text}
                            onChange={(e) => setState({ text: e.target.value })}
                            onPaste={(e) => e.preventDefault()}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="red"
                        mr={'3'}
                        onClick={() => deleteLeague()}
                        isLoading={deleteMutation.isLoading}
                    >
                        {t('modal.delete')}
                    </Button>
                    <Button onClick={props.onClose}>{t('modal.cancel')}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
