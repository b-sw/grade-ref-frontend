import {
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Heading,
  Spacer,
  Badge,
  Text,
} from '@chakra-ui/react';
import { useStore } from "zustandStore/store";
import useAuth from "../../../hooks/useAuth";
import { CalendarIcon } from '@chakra-ui/icons';
import {Path} from "utils/Path";
import {PageTitle} from "utils/PageTitle";
import {uuid} from "utils/uuid";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {MdApps, MdDashboard } from 'react-icons/md';
import {getUserBadge} from "components/dashboard/grades/GradeListItem";
import {League} from "entities/League";
import {useLeagues} from "hooks/useLeagues";

interface Props {
  pageTitle: string;
}

export const HeaderPanel = (props: Props) => {
  const user = useStore((state) => state.user);
  const calendarYear: number = useStore((state) => state.calendarYear);
  const navigate = useNavigate();
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const { logout } = useAuth();
  const { query: leaguesQuery } = useLeagues();

  const leagueIdx: number = leaguesQuery.data!.findIndex((l: League) => l.id === leagueId)!;
  const leagueShortName: string = leaguesQuery.data![leagueIdx].shortName;

  const { badgeColor, badgeString } = getUserBadge(user.role!);

  return (
    <>
      <Flex m={0} p={0} mb={2} direction={['column', 'row']}>
        <Heading>{leagueShortName} {calendarYear}</Heading>
        <Spacer />

        <Flex alignItems={'center'} direction={['column', 'row']} gap={2}>
          <Button
            onClick={() => {
              navigate(`${Path.CALENDAR}/${leagueId}`);
            }}
            leftIcon={<CalendarIcon />}
            colorScheme={props.pageTitle.includes(PageTitle.Calendar) ? 'blue' : 'gray'}
          >
            Calendar
          </Button>
          <Button
            onClick={() => {navigate(`${Path.DASHBOARD}/${leagueId}`)}}
            leftIcon={<MdDashboard />}
            colorScheme={props.pageTitle.includes(PageTitle.Dashboard) ? 'blue' : 'gray'}
          >
            Dashboard
          </Button>
          <Button
            onClick={() => {navigate(Path.EXPLORER)}}
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

              <MenuItem>Account Settings</MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  )
}