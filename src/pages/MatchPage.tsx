import {Flex, SimpleGrid,} from '@chakra-ui/react';
import {AdminHeaderPanel} from "components/admin/header/AdminHeaderPanel";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {LoadingOverlay} from "./LoadingOverlay";
import {useLeagueUsers} from "hooks/useLeagueUsers";
import {Role} from "utils/Role";
import {PageTitle} from "utils/PageTitle";
import {MatchSectionsPanel} from "components/matchPage/MatchSectionsPanel";
import { useLeagueMatch } from 'hooks/useLeagueMatch';
import { useLeagues } from 'hooks/useLeagues';
import { useMatchFeatures } from 'components/matchPage/sections/conclusions/useMatchFeatures';
import { useMatchFouls } from 'components/matchPage/sections/sanctions/useMatchFouls';
import { useStore } from 'zustandStore/store';
import { HeaderPanel } from 'components/header/HeaderPanel';

export const MatchPage = () => {
  const user = useStore((state) => state.user);
  const { usersQuery: leagueRefereesQuery } = useLeagueUsers(Role.Referee, { enableAutoRefetch: true });
  const { usersQuery: leagueObserversQuery } = useLeagueUsers(Role.Observer, { enableAutoRefetch: true });
  const { query: teamsQuery } = useLeagueTeams({ enableAutoRefetch: true });
  const { query: matchQuery } = useLeagueMatch({ enableAutoRefetch: true });
  const { query: leaguesQuery } = useLeagues({ enableAutoRefetch: true });
  const { query: featuresQuery } = useMatchFeatures({ enableAutoRefetch: true });
  const { query: foulsQuery } = useMatchFouls({ enableAutoRefetch: true });

  const queries = [leagueRefereesQuery, leagueObserversQuery, teamsQuery, matchQuery, leaguesQuery, featuresQuery, foulsQuery];
  if (queries.some((query) => query.isLoading)) {
    return (<LoadingOverlay />);
  }

  const userIsAdmin = user.role === Role.Admin;

  return (
    <>
      <Flex p={[2, 4]} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
        {userIsAdmin && <AdminHeaderPanel pageTitle={PageTitle.MatchDetails} />}
        {!userIsAdmin && <HeaderPanel pageTitle={PageTitle.MatchDetails} />}
        <SimpleGrid columns={[1, 1, 1]} flexGrow={1} overflowY={'hidden'} spacing={4} p={[4, 4, 4]} m={-4}>
          <MatchSectionsPanel
            match={matchQuery.data!}
            teams={teamsQuery.data!}
            referees={leagueRefereesQuery.data!}
            observers={leagueObserversQuery.data!}
          />
        </SimpleGrid>
      </Flex>
    </>
  );
}
