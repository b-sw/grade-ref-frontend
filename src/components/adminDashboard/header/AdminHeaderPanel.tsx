import {
  Avatar,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Badge,
} from '@chakra-ui/react';
import useStore from "../../../zustand/store";
import useAuth from "../../../hooks/useAuth";
import {Path} from "../../../shared/Path";
import {MdApps, MdDashboard} from 'react-icons/md';
import {CalendarIcon} from '@chakra-ui/icons';
import {useNavigate, useParams} from 'react-router-dom';
import {useLeagues} from "../../../hooks/useLeagues";
import {uuid} from "../../../shared/uuid";
import {League} from "../../../entities/League";
import {PageTitle} from "../../../shared/PageTitle";
import {getUserBadge} from "../../shared/MatchGradeListItem";

interface Props {
  pageTitle: PageTitle;
}

export const AdminHeaderPanel = (props: Props) => {
  const user = useStore((state) => state.user);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { query: leaguesQuery } = useLeagues();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  const leagueIdx: number = leaguesQuery.data!.findIndex((l: League) => l.id === leagueId)!;
  const leagueName: string = leaguesQuery.data![leagueIdx].name;

  const { badgeColor, badgeString } = getUserBadge(user.role!);

  return (
    <>
      <Flex m={0} p={0} pb={10}>
        <Heading>GradeRef ⚽ - {leagueName} {props.pageTitle}</Heading>
        <Spacer />

        <Flex alignItems={'center'}>
          <Button
            mr={3}
            onClick={() => {navigate(`${Path.ADMIN_CALENDAR}/${leagueId}`)}}
            leftIcon={<CalendarIcon />}
            colorScheme={props.pageTitle.includes(PageTitle.Calendar) ? 'blue' : 'gray'}
          >
            Calendar
          </Button>
          <Button
            mr={3}
            onClick={() => {navigate(`${Path.ADMIN_DASHBOARD}/${leagueId}`)}}
            leftIcon={<MdDashboard />}
            colorScheme={props.pageTitle.includes(PageTitle.Dashboard) ? 'blue' : 'gray'}
          >
            Dashboard
          </Button>
          <Button
            mr={3}
            onClick={() => {navigate(Path.ADMIN_EXPLORER)}}
            leftIcon={<MdApps />}
          >
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
              <Flex
                direction={'column'}
                align={'center'}
                p={2}
              >
                <Avatar
                  name={user.firstName + ' ' + user.lastName}
                  size={'xl'}
                />
                <Badge my={2} colorScheme={badgeColor} fontSize={'xs'}>{badgeString}</Badge>
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
                <Text fontSize={'sm'} color={'gray.400'}>
                  {user.email}
                </Text>
              </Flex>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  )
}