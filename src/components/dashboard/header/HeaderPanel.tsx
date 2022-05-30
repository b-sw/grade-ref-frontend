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
import useStore from "../../../zustand/store";
import useAuth from "../../../hooks/useAuth";
import { CalendarIcon } from '@chakra-ui/icons';
import {Path} from "../../../shared/Path";
import {PageTitle} from "../../../shared/PageTitle";
import {uuid} from "../../../shared/uuid";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {MdApps, MdDashboard } from 'react-icons/md';
import {getUserBadge} from "../../shared/MatchGradeListItem";

interface Props {
  pageTitle: string;
}

export const HeaderPanel = (props: Props) => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const { logout } = useAuth();

  const { badgeColor, badgeString } = getUserBadge(user.role!);

  return (
    <>
      <Flex m={0} p={0} pb={10}>
        <Heading>GradeRef ⚽</Heading>
        <Spacer />

        <Flex alignItems={'center'}>
          <Button
            mr={3}
            onClick={() => {
              navigate(`${Path.CALENDAR}/${leagueId}`);
            }}
            leftIcon={<CalendarIcon />}
            colorScheme={props.pageTitle.includes(PageTitle.Calendar) ? 'blue' : 'gray'}
          >
            Calendar
          </Button>
          <Button
            mr={3}
            onClick={() => {navigate(`${Path.DASHBOARD}/${leagueId}`)}}
            leftIcon={<MdDashboard />}
            colorScheme={props.pageTitle.includes(PageTitle.Dashboard) ? 'blue' : 'gray'}
          >
            Dashboard
          </Button>
          <Button
            mr={3}
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