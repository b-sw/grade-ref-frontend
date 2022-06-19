import { Flex, VStack, Text, Avatar, HStack, Divider, Center, useDisclosure, Badge, Tooltip, Spacer } from '@chakra-ui/react';
import {Match} from "../../../entities/Match";
import {useLeagueTeams} from "../../../hooks/useLeagueTeams";
import {Team} from "../../../entities/Team";
import {User} from "../../../entities/User";
import dayjs from 'dayjs';
import { CalendarIcon } from '@chakra-ui/icons';
import { BsClockFill, BsFillHouseDoorFill, BsBookmarks } from 'react-icons/bs';
import {Constants} from "../../../shared/Constants";
import {refereeItem} from "../referees/RefereeListItem";
import {observerItem} from "../observers/ObserverListItem";
import {MatchEditModal} from "./MatchEditModal";
import { MdPeople } from 'react-icons/md';
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";
import { WarningIcon } from '@chakra-ui/icons';

export interface Props {
  match: Match;
  readOnly?: boolean;
}

export const MatchListItem = (props: Props) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);
  const { query: teamsQuery } = useLeagueTeams();

  return (
    <>
      {!props.readOnly && <MatchEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} match={props.match} />}
      <Flex
        p={5}
        borderRadius={10}
        alignItems={'center'}
        backgroundColor={'gray.50'}
        cursor={props.readOnly ? 'default' : 'pointer'}
        onClick={props.readOnly ? () => {} : onEditModalOpen}
      >
        {matchItem(props.match, teamsQuery, refereesQuery, observersQuery)}
      </Flex>
    </>
  );
}

export const matchItem = (match: Match, teamsQuery: any, refereesQuery: any, observersQuery: any) => {

  const homeTeam: Team = teamsQuery.data!.find((team: Team) => team.id === match.homeTeamId)!;
  const awayTeam: Team = teamsQuery.data!.find((team: Team) => team.id === match.awayTeamId)!;
  const referee: User = refereesQuery.data!.find((referee: User) => referee.id === match.refereeId)!;
  const observer: User = observersQuery.data!.find((observer: User) => observer.id === match.observerId)!;

  const matchDate: string = dayjs(match.matchDate, Constants.DATETIME_FORMAT).format('DD-MM-YYYY');
  const matchTime: string = dayjs(match.matchDate, Constants.DATETIME_FORMAT).format('HH:mm');

  return (
    <>
      <VStack align='left' w={'100%'}>
        <Text fontSize={'md'}><b>#{match.userReadableKey}</b></Text>
        <HStack>
          <VStack align='left' mr={5} w={'40%'}>
            <HStack>
              <Avatar
                name={homeTeam.name}
                size={'sm'}
              />
              <Text fontSize={'sm'}>{homeTeam.name}</Text>
              <BsFillHouseDoorFill />
            </HStack>
            <HStack>
              <Avatar
                name={awayTeam.name}
                size={'sm'}
              />
              <Text fontSize={'sm'}>{awayTeam.name}</Text>
            </HStack>
          </VStack>

          <Center height='100px' w={'20%'}>
            <Divider orientation='vertical' />
          </Center>

          <VStack align='left' ml={5} w={'40%'}>
            <HStack>
              <CalendarIcon />
              <Text fontSize={'sm'}>{matchDate}</Text>
            </HStack>
            <HStack>
              <BsClockFill />
              <Text fontSize={'sm'}>{matchTime}</Text>
            </HStack>
          </VStack>
        </HStack>

        <Flex direction={['column', 'row']}>
          <VStack align='left' w={'40%'}>
            <HStack>
              <MdPeople />
              <Text fontSize={'md'}><b>Assignments</b></Text>
            </HStack>
            {refereeItem(referee, 'xs', 'sm', 'xs', true)}
            {observerItem(observer, 'xs', 'sm', 'xs', true)}
          </VStack>

          <Spacer />

          <VStack align='left' w={'40%'}>
            <HStack>
              <BsBookmarks />
              <Text fontSize={'md'}><b>Report</b></Text>
            </HStack>
            <HStack>
              <Text>Status:</Text>
              <Badge colorScheme={match.gradeStatus.badgeScheme} fontSize={'xs'}>{match.gradeStatus.status}</Badge>
            </HStack>
            <HStack>
              <Text>Grade:</Text>
              <Badge variant={'outline'} colorScheme={match.gradeStatus.badgeScheme} fontSize={'xs'}>{match.refereeGrade ?? 'N/A'}</Badge>
            </HStack>
            {match.gradeStatus.delay &&
              <HStack>
                <Tooltip label='delay'>
                  <WarningIcon color={'red.600'}/>
                </Tooltip>
                <Text color={'red.600'}>+{match.gradeStatus.delay}</Text>
              </HStack>
            }
          </VStack>
        </Flex>

      </VStack>
    </>
  )
}