import {
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import useStore from "../../../zustand/store";
import useAuth from "../../../hooks/useAuth";
import {Paths} from "../../../shared/Paths";
import { MdDashboard, MdPeople } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import {useLeagues} from "../../../hooks/useLeagues";
import {uuid} from "../../../shared/uuid";
import {League} from "../../../entities/League";

export const AdminHeaderPanel = () => {
  const user = useStore((state) => state.user);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { query: leaguesQuery } = useLeagues();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  const leagueIdx: number = leaguesQuery.data!.findIndex((l: League) => l.id === leagueId)!;
  const leagueName: string = leaguesQuery.data![leagueIdx].name;

  return (
    <>
      <Flex m={0} p={0} pb={10}>
        <Heading>GradeRef ⚽ - {leagueName} admin dashboard</Heading>
        <Spacer />

        <Flex alignItems={'center'}>
          <Button mr={3} onClick={() => {}} leftIcon={<MdPeople />}>
            Grades
          </Button>
          <Button mr={3} onClick={() => {navigate(Paths.ADMIN_EXPLORER)}} leftIcon={<MdDashboard />}>
            Leagues
          </Button>

          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                name={user.firstName + ' ' + user.lastName}
                size={'md'}
              />
            </MenuButton>
            <MenuList
              alignItems={'center'}
            >
              <br />
              <Center>
                <Avatar
                  name={user.firstName + ' ' + user.lastName}
                  size={'xl'}
                />
              </Center>
              <br />
              <Center>
                <p>{user.firstName} {user.lastName}</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Account Settings</MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  )
}