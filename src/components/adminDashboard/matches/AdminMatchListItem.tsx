import { Flex, Spacer, VStack, Text, Avatar, HStack, Divider, Center, useDisclosure, IconButton } from '@chakra-ui/react';
import {Match} from "../../../entities/Match";
import {useUsers} from "../../../hooks/useUsers";
import {useTeams} from "../../../hooks/useTeams";
import {Team} from "../../../entities/Team";
import {User} from "../../../entities/User";
import dayjs from 'dayjs';
import { CalendarIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { BsClockFill, BsFillHouseDoorFill } from 'react-icons/bs';
import {Constants} from "../../../other/Constants";
import {refereeItem} from "../referees/RefereeListItem";
import {observerItem} from "../observers/ObserverListItem";

export interface Props {
  match: Match;
}

export const AdminMatchListItem = (props: Props) => {
  const { /*isOpen: isEditModalOpen,*/ onOpen: onEditModalOpen, /*onClose: onEditModalClose*/ } = useDisclosure();
  const { /*isOpen: isDeleteModalOpen,*/ onOpen: onDeleteModalOpen, /*onClose: onDeleteModalClose*/ } = useDisclosure();
  const { refereesQuery, observersQuery } = useUsers();
  const { query: teamsQuery } = useTeams();

  return (
    <>
      {/*<AdminMatchEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} match={props.match} />*/}
      {/*<AdminMatchDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} match={props.match} />*/}
      <Flex py={10} borderRadius={5} alignItems={'center'}>
        {matchItem(props.match, teamsQuery, refereesQuery, observersQuery)}
        <Spacer />
        <IconButton onClick={onEditModalOpen} variant={'ghost'} aria-label='Edit match' icon={<EditIcon />} />
        <IconButton onClick={onDeleteModalOpen} variant={'ghost'} aria-label='Delete match' icon={<DeleteIcon />} />
      </Flex>
    </>
  );
}

export const matchItem = (match: Match, teamsQuery: any, refereesQuery: any, observersQuery: any) => {

  const homeTeam: Team = teamsQuery.data!.find((team: Team) => team.id === match.homeTeamId)!;
  const awayTeam: Team = teamsQuery.data!.find((team: Team) => team.id === match.awayTeamId)!;
  const referee: User = refereesQuery.data!.find((referee: User) => referee.id === match.refereeId)!;
  const observer: User = observersQuery.data!.find((observer: User) => observer.id === match.observerId)!;

  const matchDate = dayjs(match.date, Constants.DATETIME_FORMAT).format('DD-MM-YYYY');
  const matchTime = dayjs(match.date, Constants.DATETIME_FORMAT).format('HH:mm');

  return (
    <>
      <VStack align='left' w={'90%'}>
        <HStack>
          <VStack align='left' mr={5} w={'50%'}>
            <HStack>
              <Avatar
                name={homeTeam.name}
                size={'md'}
              />
              <Text fontSize={'xl'}>{homeTeam.name}</Text>
              <BsFillHouseDoorFill />
            </HStack>
            <HStack>
              <Avatar
                name={awayTeam.name}
                size={'md'}
              />
              <Text fontSize={'xl'}>{awayTeam.name}</Text>
            </HStack>
          </VStack>

          <Center height='75px' w={'10%'}>
            <Divider orientation='vertical' />
          </Center>

          <VStack align='left' ml={5} w={'40%'}>
            <HStack>
              <CalendarIcon />
              <Text fontSize={'xl'}>{matchDate}</Text>
            </HStack>
            <HStack>
              <BsClockFill />
              <Text fontSize={'xl'}>{matchTime}</Text>
            </HStack>
          </VStack>
        </HStack>

        <VStack align='left'>
          <Text fontSize={'xl'}><b>Assignments</b></Text>
          <HStack>
            <Text w={'20%'}>Referee:</Text>
            {refereeItem(referee)}
          </HStack>
          <HStack>
            <Text w={'20%'}>Observer:</Text>
            {observerItem(observer)}
          </HStack>
        </VStack>
      </VStack>
    </>
  )
}