import {
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import {AdminHeaderPanel} from "../components/adminDashboard/header/AdminHeaderPanel";
import {AdminMatchesPanel} from "../components/adminDashboard/matches/AdminMatchesPanel";
import {RefereesPanel} from "../components/adminDashboard/referees/RefereesPanel";
import {ObserversPanel} from "../components/adminDashboard/observers/ObserversPanel";
import {TeamsPanel} from "../components/adminDashboard/teams/TeamsPanel";
import {AdminSettingsPanel} from "../components/adminDashboard/settings/AdminSettingsPanel";

export const AdminDashboard = () => {
  return (
    <>
      <Flex p={5} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
        <AdminHeaderPanel />
        <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={5} p={5} m={-5} pt={5}>
          <AdminMatchesPanel />
          <Flex direction={'column'} gap={5} overflowY={'hidden'}>
            <RefereesPanel />
            <ObserversPanel />
          </Flex>
          <Flex direction={'column'} gap={5} overflowY={'hidden'}>
            <TeamsPanel />
            <AdminSettingsPanel />
          </Flex>
        </SimpleGrid>
      </Flex>
    </>
  );
}