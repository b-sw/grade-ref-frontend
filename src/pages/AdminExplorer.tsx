import {
  Flex,
  Spacer,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { HiOutlineLogout } from 'react-icons/hi';
import {useLeagues} from "../hooks/useLeagues";
import {League} from "../entities/League";
import {LeagueCard} from "../components/adminExplorer/LeagueCard";
import {LoadingOverlay} from "./LoadingOverlay";
import {LeagueCreateModal} from "../components/ownerDashboard/leagues/LeagueCreateModal";
import useStore from "../zustand/store";

export const AdminExplorer = () => {
  const user = useStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { query: leaguesQuery } = useLeagues({ userId: user.id! });
  const { logout } = useAuth();
  const queries = [leaguesQuery];

  if (queries.some((query) => query.isLoading)) {
    return (<LoadingOverlay />);
  }

  return (
    <Flex p={4} m={0} h={['100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
      <LeagueCreateModal isOpen={isOpen} onClose={onClose} />
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
            leaguesQuery.data.map((league: League) => (
              <LeagueCard key={league.id} league={league} />
            ))}
          <Button
            ml={5}
            onClick={onOpen}
            rightIcon={<PlusSquareIcon />}
            variant={'outline'}
            w={['80%', '80%', '20%']}
            h={'20%'}
            minH={'10em'}
            colorScheme={'customButton'}
          >
            Add league
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
