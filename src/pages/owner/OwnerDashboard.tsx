import { Flex, SimpleGrid } from '@chakra-ui/react';
import { OwnerHeaderPanel } from 'components/owner/header/OwnerHeaderPanel';
import { useUsers } from 'hooks/useUsers';
import { LoadingOverlay } from '../LoadingOverlay';
import { OwnerRefereesPanel } from 'components/owner/referees/OwnerRefereesPanel';
import { OwnerObserversPanel } from 'components/owner/observers/OwnerObserversPanel';
import { OwnerAdminsPanel } from 'components/owner/admins/OwnerAdminsPanel';
import { LeaguesPanel } from 'components/owner/leagues/LeaguesPanel';
import { useLeagues } from 'hooks/useLeagues';

export const OwnerDashboard = () => {
  const { adminsQuery, refereesQuery, observersQuery } = useUsers({ enableAutoRefetch: true });
  const { query: leaguesQuery } = useLeagues({ enableAutoRefetch: true });
  const queries = [adminsQuery, refereesQuery, observersQuery, leaguesQuery];

  if (queries.some((query) => query.isLoading)) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Flex
        p={[2, 4]}
        m={0}
        h={['auto', '100vh']}
        direction={'column'}
        overflow={'hidden'}
        backgroundColor={'gray.400'}
      >
        <OwnerHeaderPanel />
        <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={5} p={5} m={-5} pt={5}>
          <Flex direction={'column'} gap={5} overflowY={'hidden'}>
            <LeaguesPanel />
            <OwnerAdminsPanel />
          </Flex>
          <OwnerRefereesPanel />
          <OwnerObserversPanel />
        </SimpleGrid>
      </Flex>
    </>
  );
};
