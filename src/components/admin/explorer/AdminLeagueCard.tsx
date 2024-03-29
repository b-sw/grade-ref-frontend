import { Avatar, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Path } from 'utils/Path';
import { League } from 'entities/League';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { useLeagueMatches } from 'hooks/useLeagueMatches';
import { useLeagueUsers } from 'hooks/useLeagueUsers';
import { Role } from 'utils/Role';
import { useReferees } from 'hooks/useReferees';
import { useObservers } from 'hooks/useObservers';
import { useTranslation } from 'react-i18next';

interface Props {
    league: League;
}

export const AdminLeagueCard = (props: Props) => {
    const navigate = useNavigate();
    const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee, { leagueId: props.league.id });
    const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer, { leagueId: props.league.id });
    const { query: teamsQuery } = useLeagueTeams({ leagueId: props.league.id });
    const { query: matchesQuery } = useLeagueMatches({ leagueId: props.league.id });
    const { refereesQuery: allRefereesQuery } = useReferees({ enableAutoRefetch: true });
    const { observersQuery: allObserversQuery } = useObservers({ enableAutoRefetch: true });
    const { t } = useTranslation();

    const loadingQueries = [refereesQuery, observersQuery, teamsQuery, matchesQuery];
    const allQueries = [allRefereesQuery, allObserversQuery, ...loadingQueries];

    const navigateToDashboard = async (league: League) => {
        await Promise.all(
            allQueries.map(async (query): Promise<any> => {
                await query.refetch();
            }),
        );
        navigate(`${Path.ADMIN_DASHBOARD}/${league.id}`);
    };

    return (
        <Flex borderRadius={5} p={5} backgroundColor={'gray.300'} shadow={'md'} w={['80%', '80%', '20%']}>
            <VStack alignItems={'baseline'} w={'100%'}>
                {leagueItem(props.league)}
                <Button
                    w={'100%'}
                    onClick={async () => await navigateToDashboard(props.league)}
                    isLoading={loadingQueries.some((query) => query.isLoading)}
                >
                    {t('explorer.select')}
                </Button>
            </VStack>
        </Flex>
    );
};

export const leagueItem = (league: League) => {
    return (
        <>
            <HStack>
                <Avatar getInitials={(name) => name} name={league.shortName} size={'md'} />
                <VStack spacing={0} alignItems={'baseline'}>
                    <Text>
                        <b>{league.name}</b>
                    </Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                        {league.country}
                    </Text>
                </VStack>
            </HStack>
        </>
    );
};
