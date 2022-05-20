import {Avatar, Button, Flex, HStack, Text, VStack} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {Paths} from '../../shared/Paths';
import {League} from "../../entities/League";
import {useTeams} from "../../hooks/useTeams";
import {useMatches} from "../../hooks/useMatches";
import {useLeagueUsers} from "../../hooks/useLeagueUsers";
import {Role} from "../../shared/Role";

interface Props {
  league: League;
}

export const LeagueCard = (props: Props) => {
  const navigate = useNavigate();
  const { query: refereesQuery } = useLeagueUsers(Role.Referee, { disableAutoRefetch: true, leagueId: props.league.id });
  const { query: observersQuery } = useLeagueUsers(Role.Observer, { disableAutoRefetch: true, leagueId: props.league.id });
  const { query: teamsQuery } = useTeams({ disableAutoRefetch: true, leagueId: props.league.id });
  const { query: matchesQuery } = useMatches({ disableAutoRefetch: true, leagueId: props.league.id });
  const queries = [refereesQuery, observersQuery, teamsQuery, matchesQuery]

  const navigateToDashboard = async (league: League) => {
    await Promise.all(queries.map(async (query): Promise<any> => {
      await query.refetch();
    }));
    navigate(`${Paths.ADMIN_DASHBOARD}/${league.id}`);
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
          Select
        </Button>
      </VStack>
    </Flex>
  );
};

export const leagueItem = (league: League) => {
  return (
    <>
      <HStack py={2}>
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
