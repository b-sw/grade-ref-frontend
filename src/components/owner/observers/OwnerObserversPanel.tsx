import { Button, Flex, Input, InputGroup, InputLeftElement, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ObserverCreateModal } from 'components/owner/observers/ObserverCreateModal';
import { useUsers } from 'hooks/useUsers';
import { User } from 'entities/User';
import { ObserverListItem } from 'components/owner/observers/ObserverListItem';
import { MdSearch } from 'react-icons/md';
import { useSetState } from 'hooks/useSetState';
import { userFilter } from 'components/utils/filters';
import { useEffect } from 'react';

interface State {
    observers: User[];
    filter: string;
}

export const OwnerObserversPanel = () => {
    const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
    const { observersQuery } = useUsers();

    const [state, setState] = useSetState({
        observers: [],
        filter: '',
    } as State);

    useEffect(() => {
        const filteredObservers: User[] = userFilter(observersQuery.data!, state.filter);
        setState({ observers: filteredObservers });
    }, [state.filter, observersQuery.data]);

    return (
        <>
            <ObserverCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
            <Flex
                direction={'column'}
                borderRadius={10}
                p={5}
                backgroundColor={'gray.300'}
                shadow={'md'}
                overflowY={'hidden'}
                flexGrow={1}
            >
                <Flex mb={4}>
                    <Text fontWeight={'bold'} fontSize={'2xl'}>
                        Observers
                    </Text>
                    <Spacer />
                    <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
                        Add
                    </Button>
                </Flex>

                <InputGroup>
                    <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
                    <Input
                        mb={2}
                        placeholder={'Search observer'}
                        onChange={(event) => setState({ filter: event.target.value })}
                    />
                </InputGroup>

                <Flex direction={'column'} gap={2} overflowY={'scroll'}>
                    {state.observers.map((observer: User) => (
                        <ObserverListItem key={observer.id} observer={observer} />
                    ))}
                </Flex>
            </Flex>
        </>
    );
};
