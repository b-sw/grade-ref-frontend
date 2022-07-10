import {Avatar, Button, Flex, HStack, Text, VStack} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {Path} from 'utils/Path';
import {League} from "entities/League";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {useLeagueMatches} from "hooks/useLeagueMatches";
import {useLeagueUsers} from "hooks/useLeagueUsers";
import {Role} from "utils/Role";
import {useReferees} from "hooks/useReferees";
import {useObservers} from "hooks/useObservers";

interface Props {
  league: League;
}

export const AdminLeagueCard = (props: Props) => {
  const navigate = useNavigate();
  const { usersQuery: refereesQuery } =
    useLeagueUsers(Role.Referee, { disableAutoRefetch: true, leagueId: props.league.id });
  const { usersQuery: observersQuery } =
    useLeagueUsers(Role.Observer, { disableAutoRefetch: true, leagueId: props.league.id });
  const { query: teamsQuery } = useLeagueTeams({ disableAutoRefetch: true, leagueId: props.league.id });
  const { query: matchesQuery } = useLeagueMatches({ disableAutoRefetch: true, leagueId: props.league.id });
  const { refereesQuery: allRefereesQuery } = useReferees({ disableAutoRefetch: true });
  const { observersQuery: allObserversQuery } = useObservers({ disableAutoRefetch: true });

  const loadingQueries = [refereesQuery, observersQuery, teamsQuery, matchesQuery];
  const queries = [allRefereesQuery, allObserversQuery, ...loadingQueries];

  const navigateToDashboard = async (league: League) => {
    await Promise.all(queries.map(async (query): Promise<any> => {
      await query.refetch();
    }));
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
          Select
        </Button>
      </VStack>
    </Flex>
  );
};

export const leagueItem = (league: League) => {
  return (
    <>
      <HStack>
        <Avatar
          name={league.name}
          size={'md'}
        />
        <VStack spacing={0} alignItems={'baseline'}>
          <Text><b>{league.name}</b></Text>
          <Text fontSize={'sm'} color={'gray.500'}>
            {league.country}
          </Text>
        </VStack>
      </HStack>
    </>
  );
}
