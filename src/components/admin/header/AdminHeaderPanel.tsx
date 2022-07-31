import {
  Avatar,
  Badge,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useStore } from 'zustandStore/store';
import useAuth from 'hooks/useAuth';
import { Path } from 'utils/Path';
import { MdApps, MdDashboard } from 'react-icons/md';
import { CalendarIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useLeagues } from 'hooks/useLeagues';
import { uuid } from 'utils/uuid';
import { League } from 'entities/League';
import { PageTitle } from 'utils/PageTitle';
import { getUserBadge } from 'components/dashboard/grades/GradeListItem';
import dayjs from 'dayjs';
import { AdminSettingsModal } from 'components/admin/settings/AdminSettingsModal';
import { RiTeamFill } from 'react-icons/ri';
import { TeamsModal } from 'components/admin/teams/TeamsModal';
import { LoadingOverlay } from 'pages/LoadingOverlay';
import { useTranslation } from 'react-i18next';

interface Props {
  pageTitle: PageTitle;
}

export const AdminHeaderPanel = (props: Props) => {
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const { isOpen: isTeamsOpen, onOpen: onTeamsOpen, onClose: onTeamsClose } = useDisclosure();

  const user = useStore((state) => state.user);
  const calendarYear: number = useStore((state) => state.calendarYear);
  const setCalendarYear = useStore((state) => state.setCalendarYear);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { query: leaguesQuery } = useLeagues({ enableAutoRefetch: true });
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const { t } = useTranslation();

  if (leaguesQuery.isLoading) {
    return <LoadingOverlay />;
  }

  const leagueIdx: number = leaguesQuery.data!.findIndex((l: League) => l.id === leagueId)!;
  const leagueName: string = leaguesQuery.data![leagueIdx].name;

  const { badgeColor, badgeString } = getUserBadge(user.role!, t);

  return (
    <>
      <AdminSettingsModal isOpen={isSettingsOpen} onClose={onSettingsClose} />
      <TeamsModal isOpen={isTeamsOpen} onClose={onTeamsClose} />

      <Flex m={0} p={0} mb={2} direction={['column', 'row']}>
        <Spacer />
        <Flex alignItems={'center'} direction={['column', 'row']} gap={2}>
          <Button
            onClick={() => {
              navigate(`${Path.ADMIN_CALENDAR}/${leagueId}`);
            }}
            leftIcon={<CalendarIcon />}
            colorScheme={props.pageTitle.includes(PageTitle.Calendar) ? 'blue' : 'gray'}
          >
            Calendar
          </Button>

          <Button
            onClick={() => {
              setCalendarYear(dayjs().year());
              navigate(Path.ADMIN_EXPLORER);
            }}
            leftIcon={<MdApps />}
          >
            Leagues
          </Button>

          <Button onClick={onTeamsOpen} leftIcon={<RiTeamFill />} colorScheme={isTeamsOpen ? 'blue' : 'gray'}>
            Teams
          </Button>

          <Button
            onClick={() => {
              setCalendarYear(dayjs().year());
              navigate(`${Path.ADMIN_DASHBOARD}/${leagueId}`);
            }}
            leftIcon={<MdDashboard />}
            colorScheme={props.pageTitle.includes(PageTitle.Dashboard) && !isTeamsOpen ? 'blue' : 'gray'}
          >
            Dashboard
          </Button>

          <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Avatar name={user.firstName + ' ' + user.lastName} size={'md'} />
            </MenuButton>
            <MenuList alignItems={'center'}>
              <Flex direction={'column'} align={'center'} p={2}>
                <Avatar name={user.firstName + ' ' + user.lastName} size={'xl'} />
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
                <Text fontSize={'sm'} color={'gray.400'}>
                  {user.email}
                </Text>

                <Badge mt={3} colorScheme={badgeColor} fontSize={'xs'}>
                  {badgeString}
                </Badge>
                <Text mb={2} mt={1}>
                  {leagueName} {calendarYear}
                </Text>
              </Flex>

              <MenuDivider />

              <MenuItem onClick={onSettingsOpen}>Settings</MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
};
