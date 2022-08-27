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
import { User } from 'entities/User';
import { useSetState } from 'hooks/useSetState';
import { useLeagueUsers } from 'hooks/useLeagueUsers';
import { useObservers } from 'hooks/useObservers';
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
    mappedObservers: Option[];
}

export const ObserverAddModal = (props: Props) => {
    const { usersQuery: leagueObserversQuery, addMutation } = useLeagueUsers(Role.Observer);
    const { observersQuery } = useObservers();
    const { t } = useTranslation();

    const [state, setState] = useSetState({
        selectedOptions: [],
        mappedObservers: [],
    } as State);

    const updateSelection = (selection: MultiValue<Option>) => {
        setState({ selectedOptions: selection });
    };

    useEffect(() => {
        const filteredReferees: User[] = observersQuery.data!.filter(
            (observer: User) => !leagueObserversQuery.data!.some((leagueObserver) => leagueObserver.id === observer.id),
        );
        const observers: Option[] = filteredReferees.map((observer) => ({
            value: observer,
            label: observer.firstName + ' ' + observer.lastName,
        }));
        setState({ mappedObservers: observers });
    }, [leagueObserversQuery.data]);

    useEffect(() => {
        if (addMutation.isSuccess) {
            props.onClose();
            addMutation.reset();
        }
    }, [addMutation.isSuccess]);

    const addObservers = () => {
        const selectedObservers: User[] = state.selectedOptions.map((option: Option) => option.value as User);
        selectedObservers.forEach((referee) => addMutation.mutate(referee));
    };

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('observers.addModal.title')}</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <FormControl p={4}>
                        <FormLabel>{t('observers.addModal.select')}</FormLabel>
                        <Select
                            isMulti
                            name={'referees'}
                            options={state.mappedObservers}
                            placeholder={t('observers.addModal.select')}
                            closeMenuOnSelect={false}
                            onChange={(selection) => updateSelection(selection)}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={'3'} onClick={addObservers} isLoading={addMutation.isLoading}>
                        {t('modal.add')}
                    </Button>
                    <Button onClick={() => props.onClose()}>{t('modal.cancel')}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
