import { useLeagues } from 'hooks/useLeagues';
import useAuth from '../hooks/useAuth';
import { LoadingOverlay } from './LoadingOverlay';
import { League } from 'entities/League';
import { Button, Flex, Spacer } from '@chakra-ui/react';
import { HiOutlineLogout } from 'react-icons/hi';
import { LeagueCard } from 'components/explorer/LeagueCard';

export const Explorer = () => {
  const { query: leaguesQuery } = useLeagues({ enableAutoRefetch: true });
  const { logout } = useAuth();
  const queries = [leaguesQuery];

  if (queries.some((query) => query.isLoading)) {
    return <LoadingOverlay />;
  }

  return (
    <Flex p={[2, 4]} m={0} h={['100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
      <Flex mb={5}>
        <Spacer />
        <Button ml={3} onClick={() => logout()} leftIcon={<HiOutlineLogout />}>
          Log out
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
            leaguesQuery.data.map((league: League) => <LeagueCard key={league.id} league={league} />)}
        </Flex>
      </Flex>
    </Flex>
  );
};
