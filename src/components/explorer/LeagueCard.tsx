import {Button, Flex, VStack} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {Path} from '../../shared/Path';
import {League} from "../../entities/League";
import {useLeagueTeams} from "../../hooks/useLeagueTeams";
import {useLeagueUsers} from "../../hooks/useLeagueUsers";
import {Role} from "../../shared/Role";
import {leagueItem} from "../adminExplorer/AdminLeagueCard";
import {useUserMatches} from "../../hooks/useUserMatches";
import useStore from "../../zustand/store";

interface Props {
  league: League;
}

export const LeagueCard = (props: Props) => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee, { disableAutoRefetch: true, leagueId: props.league.id });
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer, { disableAutoRefetch: true, leagueId: props.league.id });
  const { query: teamsQuery } = useLeagueTeams({ disableAutoRefetch: true, leagueId: props.league.id });
  const { query: matchesQuery } = useUserMatches({ userId: user.id!, disableAutoRefetch: true, leagueId: props.league.id });

  const queries = [refereesQuery, observersQuery, teamsQuery, matchesQuery];

  const navigateToDashboard = async (league: League) => {
    await Promise.all(queries.map(async (query): Promise<any> => {
      await query.refetch();
    }));
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
          Select
        </Button>
      </VStack>
    </Flex>
  );
};