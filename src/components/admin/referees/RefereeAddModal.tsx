import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Role } from 'utils/Role';
import { MultiValue, Select } from 'chakra-react-select';
import { useLeagueUsers } from 'hooks/useLeagueUsers';
import { useSetState } from 'hooks/useSetState';
import { User } from 'entities/User';
import { useReferees } from 'hooks/useReferees';
import { useTranslation } from 'react-i18next';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

interface Option {
    value: User;
    label: string;
}

interface State {
    selectedOptions: MultiValue<Option>;
    mappedReferees: Option[];
}

export const RefereeAddModal = (props: Props) => {
    const { usersQuery: leagueRefereesQuery, addMutation } = useLeagueUsers(Role.Referee);
    const { refereesQuery } = useReferees();
    const { t } = useTranslation();

    const [state, setState] = useSetState({
        selectedOptions: [],
        mappedReferees: [],
    } as State);

    const updateSelection = (selection: MultiValue<Option>) => {
        setState({ selectedOptions: selection });
    };

    useEffect(() => {
        const filteredReferees: User[] = refereesQuery.data!.filter(
            (referee: User) => !leagueRefereesQuery.data!.some((leagueReferee) => leagueReferee.id === referee.id),
        );
        const referees: Option[] = filteredReferees.map((referee) => ({
            value: referee,
            label: referee.firstName + ' ' + referee.lastName,
        }));
        setState({ mappedReferees: referees });
    }, [leagueRefereesQuery.data]);

    useEffect(() => {
        if (addMutation.isSuccess) {
            props.onClose();
            addMutation.reset();
        }
    }, [addMutation.isSuccess]);

    const addReferees = () => {
        const selectedReferees: User[] = state.selectedOptions.map((option: Option) => option.value as User);
        selectedReferees.forEach((referee) => addMutation.mutate(referee));
    };

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('referees.addModal.title')}</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <FormControl p={4}>
                        <FormLabel>{t('referees.addModal.select')}</FormLabel>
                        <Select
                            isMulti
                            name={'referees'}
                            options={state.mappedReferees}
                            placeholder={t('referees.addModal.select')}
                            closeMenuOnSelect={false}
                            onChange={(selection) => updateSelection(selection)}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={'3'} onClick={addReferees} isLoading={addMutation.isLoading}>
                        {t('modal.add')}
                    </Button>
                    <Button onClick={() => props.onClose()}>{t('modal.cancel')}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
