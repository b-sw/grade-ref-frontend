import {
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import {AdminHeaderPanel} from "../components/adminDashboard/header/AdminHeaderPanel";
import {SettingsPanel} from "../components/dashboard/settings/SettingsPanel";
import {AdminMatchesPanel} from "../components/adminDashboard/matches/AdminMatchesPanel";
import {RefereesPanel} from "../components/adminDashboard/referees/RefereesPanel";
import {ObserversPanel} from "../components/adminDashboard/observers/ObserversPanel";
import {TeamsPanel} from "../components/adminDashboard/teams/TeamsPanel";

export const AdminDashboard = () => {
  return (
    <>
      <Flex p={5} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'}>
        <AdminHeaderPanel />
        <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={5} p={5} m={-5} pt={5}>
          <AdminMatchesPanel />
          <Flex direction={'column'} gap={5}>
            <RefereesPanel />
            <ObserversPanel />
          </Flex>
          <Flex direction={'column'} gap={5}>
            <TeamsPanel />
            <SettingsPanel />
          </Flex>
        </SimpleGrid>
      </Flex>
    </>
  );
}