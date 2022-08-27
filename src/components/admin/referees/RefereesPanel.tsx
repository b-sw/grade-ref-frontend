import { Button, Flex, FlexProps, Input, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { User } from 'entities/User';
import { RefereeListItem } from 'components/admin/referees/RefereeListItem';
import { RefereeAddModal } from 'components/admin/referees/RefereeAddModal';
import { useLeagueUsers } from 'hooks/useLeagueUsers';
import { Role } from 'utils/Role';
import { useSetState } from 'hooks/useSetState';
import { userFilter } from 'components/utils/filters';
import { useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import { NoRecords } from 'components/utils/NoRecords';
import { useTranslation } from 'react-i18next';
import { Panel } from 'components/generic/Panel';

interface State {
    referees: User[];
    filter: string;
}

export const RefereesPanel = () => {
    const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
    const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
    const { t } = useTranslation();

    const [state, setState] = useSetState({
        referees: [],
        filter: '',
    } as State);

    useEffect(() => {
        const filteredReferees: User[] = userFilter(refereesQuery.data!, state.filter);
        setState({ referees: filteredReferees });
    }, [state.filter, refereesQuery.data]);

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
            <RefereeAddModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
            <Panel headerTitle={t('referee_many')} headerButtons={headerButtons} options={panelOptions}>
                <InputGroup>
                    <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
                    <Input
                        mb={2}
                        placeholder={t('referees.search')}
                        onChange={(event) => setState({ filter: event.target.value })}
                    />
                </InputGroup>

                <Flex direction={'column'} gap={2} overflow={'scroll'}>
                    {state.referees.length
                        ? state.referees.map((referee: User) => <RefereeListItem key={referee.id} referee={referee} />)
                        : NoRecords(t('noRecords'))}
                </Flex>
            </Panel>
        </>
    );
};
