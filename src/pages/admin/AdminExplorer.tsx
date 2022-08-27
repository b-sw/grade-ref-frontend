import { Button, Flex, IconButton, Spacer, useDisclosure } from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth';
import { PlusSquareIcon, SettingsIcon } from '@chakra-ui/icons';
import { HiOutlineLogout } from 'react-icons/hi';
import { useLeagues } from 'hooks/useLeagues';
import { League } from 'entities/League';
import { AdminLeagueCard } from 'components/admin/explorer/AdminLeagueCard';
import { LoadingOverlay } from '../LoadingOverlay';
import { LeagueCreateModal } from 'components/owner/leagues/LeagueCreateModal';
import { LanguageSettingsModal } from 'components/explorer/LanguageSettingsModal';
import { useTranslation } from 'react-i18next';
import { Page } from 'components/generic/Page';

export const AdminExplorer = () => {
    const { isOpen: isCreateLeagueOpen, onOpen: onCreateLeagueOpen, onClose: onCreateLeagueClose } = useDisclosure();
    const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
    const { query: leaguesQuery } = useLeagues({ enableAutoRefetch: true });
    const { logout } = useAuth();
    const { t } = useTranslation();

    const queries = [leaguesQuery];

    if (queries.some((query) => query.isLoading)) {
        return <LoadingOverlay />;
    }

    return (
        <Page>
            <LanguageSettingsModal isOpen={isSettingsOpen} onClose={onSettingsClose} />
            <LeagueCreateModal isOpen={isCreateLeagueOpen} onClose={onCreateLeagueClose} />
            <Flex mb={5}>
                <Spacer />
                <IconButton aria-label={'settings'} onClick={onSettingsOpen} icon={<SettingsIcon />} />
                <Button ml={3} onClick={() => logout()} leftIcon={<HiOutlineLogout />}>
                    {t('explorer.logOut')}
                </Button>
            </Flex>
            <Flex flexGrow={1} flexDirection={'column'} justifyContent={'center'}>
                <Flex
                    direction={['column', 'column', 'row']}
                    gap={6}
                    w={'100%'}
                    mt={-10}
                    justifyContent={'center'}
                    align={'center'}
                    wrap={'wrap'}
                >
                    {leaguesQuery.data &&
                        leaguesQuery.data.map((league: League) => <AdminLeagueCard key={league.id} league={league} />)}
                    <Button
                        ml={[0, 0, 5]}
                        onClick={onCreateLeagueOpen}
                        rightIcon={<PlusSquareIcon />}
                        variant={'outline'}
                        w={['80%', '80%', '20%']}
                        h={'20%'}
                        minH={'10em'}
                        colorScheme={'explorerButton'}
                    >
                        {t('explorer.addLeague')}
                    </Button>
                </Flex>
            </Flex>
        </Page>
    );
};
