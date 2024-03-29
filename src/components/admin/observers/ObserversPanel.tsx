import { Button, Flex, FlexProps, Input, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ObserverAddModal } from 'components/admin/observers/ObserverAddModal';
import { User } from 'entities/User';
import { ObserverListItem } from 'components/admin/observers/ObserverListItem';
import { useLeagueUsers } from 'hooks/useLeagueUsers';
import { Role } from 'utils/Role';
import { MdSearch } from 'react-icons/md';
import { useSetState } from 'hooks/useSetState';
import { userFilter } from 'components/utils/filters';
import { useEffect } from 'react';
import { NoRecords } from 'components/utils/NoRecords';
import { useTranslation } from 'react-i18next';
import { Panel } from 'components/generic/Panel';

interface State {
    observers: User[];
    filter: string;
}

export const ObserversPanel = () => {
    const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
    const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);
    const { t } = useTranslation();

    const [state, setState] = useSetState({
        observers: [],
        filter: '',
    } as State);

    useEffect(() => {
        const filteredObservers: User[] = userFilter(observersQuery.data!, state.filter);
        setState({ observers: filteredObservers });
    }, [state.filter, observersQuery.data]);

    const headerButtons = (
        <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen} size={'md'}>
            {t('modal.add')}
        </Button>
    );

    const panelOptions: FlexProps = {
        w: ['auto', '50%'],
        h: ['auto', '100%'],
    };

    return (
        <>
            <ObserverAddModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
            <Panel headerTitle={t('observer_many')} headerButtons={headerButtons} options={panelOptions}>
                <InputGroup>
                    <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
                    <Input
                        mb={2}
                        placeholder={t('observers.search')}
                        onChange={(event) => setState({ filter: event.target.value })}
                    />
                </InputGroup>

                <Flex direction={'column'} gap={2} overflowY={'scroll'}>
                    {state.observers.length
                        ? state.observers.map((observer: User) => (
                              <ObserverListItem key={observer.id} observer={observer} />
                          ))
                        : NoRecords(t('noRecords'))}
                </Flex>
            </Panel>
        </>
    );
};
