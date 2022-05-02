import {
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { SettingsPanel } from '../components/dashboard/settings/SettingsPanel';
import { MatchesPanel } from "../components/dashboard/matches/MatchesPanel";
import { AssignmentsPanel } from '../components/dashboard/assignments/AssignmentsPanel';
import { GradesPanel } from '../components/dashboard/grades/GradesPanel';
import {HeaderPanel} from "../components/dashboard/header/HeaderPanel";

export const Dashboard = () => {
  return (
    <>
      <Flex p={10} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'}>
        <HeaderPanel />
        <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={10} p={10} m={-10} pt={10}>
          <MatchesPanel />
          <GradesPanel />
          <Flex direction={'column'} gap={10}>
            <AssignmentsPanel />
            <SettingsPanel />
          </Flex>
        </SimpleGrid>
      </Flex>
    </>
  );
}