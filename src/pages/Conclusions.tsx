import { HeaderPanel } from 'components/header/HeaderPanel';
import { PageTitle } from 'utils/PageTitle';
import { Flex } from '@chakra-ui/react';
import { useUserFeatures } from 'hooks/useUserFeatures';
import { LoadingOverlay } from 'pages/LoadingOverlay';
import { ConclusionsPanel } from 'components/conclusions/ConclusionsPanel';
import { useLeagues } from 'hooks/useLeagues';

export const Conclusions = () => {
  const { query: conclusionsQuery } = useUserFeatures({ enableAutoRefetch: true });
  const { query: leaguesQuery } = useLeagues({ enableAutoRefetch: true });

  if ([conclusionsQuery, leaguesQuery].some((query) => query.isLoading)) {
    return <LoadingOverlay />;
  }

  return (
    <Flex p={[2, 4]} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
      <HeaderPanel pageTitle={PageTitle.Conclusions} />
      <ConclusionsPanel />
    </Flex>
  );
};
