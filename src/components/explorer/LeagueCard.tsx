import { Button, Flex, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Path } from 'utils/Path';
import { League } from 'entities/League';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { leagueItem } from 'components/admin/explorer/AdminLeagueCard';
import { useUserMatches } from 'hooks/useUserMatches';
import { useStore } from 'zustandStore/store';
import { useTranslation } from 'react-i18next';

interface Props {
    league: League;
}

export const LeagueCard = (props: Props) => {
    const navigate = useNavigate();
    const user = useStore((state) => state.user);
    const { query: teamsQuery } = useLeagueTeams({ leagueId: props.league.id });
    const { query: matchesQuery } = useUserMatches({ userId: user.id!, leagueId: props.league.id });
    const { t } = useTranslation();

    const queries = [teamsQuery, matchesQuery];

    const navigateToDashboard = async (league: League) => {
        await Promise.all(
            queries.map(async (query): Promise<any> => {
                await query.refetch();
            }),
        );
        navigate(`${Path.DASHBOARD}/${league.id}`);
    };

    return (
        <Flex borderRadius={5} p={5} backgroundColor={'gray.300'} shadow={'md'} w={['80%', '80%', '20%']}>
            <VStack alignItems={'baseline'} w={'100%'}>
                {leagueItem(props.league)}
                <Button
                    w={'100%'}
                    onClick={async () => await navigateToDashboard(props.league)}
                    isLoading={queries.some((query) => query.isLoading)}
                >
                    {t('explorer.select')}
                </Button>
            </VStack>
        </Flex>
    );
};
