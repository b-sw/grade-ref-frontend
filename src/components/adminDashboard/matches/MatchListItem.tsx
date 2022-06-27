import { Flex, VStack, Text, Avatar, HStack, Divider, Center, Badge, Tooltip, Spacer, IconButton } from '@chakra-ui/react';
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
import { MdPeople } from 'react-icons/md';
import { BsArrowRight } from 'react-icons/bs';
import { WarningIcon } from '@chakra-ui/icons';
import { GiSoccerField } from "react-icons/gi";
import { motion } from 'framer-motion';
import {Path} from "../../../shared/Path";
import {NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import {uuid} from "../../../shared/uuid";

export interface Props {
  match: Match;
  readOnly?: boolean;
}

export const MatchListItem = (props: Props) => {
  const { query: teamsQuery } = useLeagueTeams();
  const navigate: NavigateFunction = useNavigate();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  return (
    <>
      {/*{!props.readOnly && <MatchEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} match={props.match} />}*/}
      <Flex
        p={5}
        borderRadius={10}
        alignItems={'center'}
        backgroundColor={'gray.50'}
        cursor={props.readOnly ? 'default' : 'pointer'}
        onClick={props.readOnly ? () => {} : () => { navigate(`${Path.MATCH_DETAILS}/${leagueId}/match/${props.match.id}`); }}
        w={'100%'}
      >
        {matchItem2(props.match, teamsQuery.data!, navigate, leagueId!, props.readOnly)}
      </Flex>
    </>
  );
}

export const matchItem2 = (match: Match, teams: Team[], navigate: NavigateFunction, leagueId: uuid, readOnly?: boolean) => {
  const homeTeam: Team = teams.find((team: Team) => team.id === match.homeTeamId)!;
  const awayTeam: Team = teams.find((team: Team) => team.id === match.awayTeamId)!;
  const matchDate: string = dayjs(match.matchDate, Constants.DATETIME_FORMAT).format('DD-MM-YYYY');
  const matchTime: string = dayjs(match.matchDate, Constants.DATETIME_FORMAT).format('HH:mm');

  return (
    <Flex direction={'row'} w={'100%'} alignItems={'center'}>
      <Flex w={'50%'}>
        <Flex w={'40%'}>
          <Spacer />
          <Text fontWeight={'medium'}>{homeTeam.name}</Text>
        </Flex>

        <Flex w={'20%'}>
          <Spacer />

          <Flex
            direction={'column'}
            borderRadius={5}
            borderWidth={1}
            px={1}
            borderColor={'gray.300'}
          >
            <Spacer />
            <Text fontWeight={'light'}>{matchTime}</Text>
            <Spacer />
          </Flex>

          <Spacer />
        </Flex>

        <Flex w={'40%'}>
          <Text fontWeight={'medium'}>{awayTeam.name}</Text>
          <Spacer />
        </Flex>
      </Flex>

      <Spacer />

      <Flex direction={'row'} w={'30%'} alignItems={'center'} >
        <GiSoccerField />
        <Text fontSize={'sm'} ml={1}>{match.stadium}</Text>
      </Flex>

      <Spacer />

      <Flex direction={'row'} w={'15%'} alignItems={'center'}>
        <CalendarIcon />
        <Text fontSize={'sm'} ml={1}>{matchDate}</Text>
      </Flex>

      <Flex direction={'row'} w={'5%'}>
        {!readOnly &&
          <IconButton
            as={motion.div}
            onClick={() => { navigate(`${Path.MATCH_DETAILS}/${leagueId}/match/${match.id}`); }}
            variant={'ghost'}
            aria-label='match-details'
            whileHover={{ left: 5 }}
            icon={
              <BsArrowRight />
            }
          />
        }
      </Flex>
    </Flex>
  )
}

export const matchItem = (match: Match, teams: Team[], referees: User[], observers: User[]) => {
  const homeTeam: Team = teams.find((team: Team) => team.id === match.homeTeamId)!;
  const awayTeam: Team = teams.find((team: Team) => team.id === match.awayTeamId)!;
  const referee: User = referees.find((referee: User) => referee.id === match.refereeId)!;
  const observer: User = observers.find((observer: User) => observer.id === match.observerId)!;

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