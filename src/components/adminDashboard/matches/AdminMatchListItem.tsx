import { Flex, Spacer, VStack, Text, Avatar, HStack, Divider, Center, useDisclosure, IconButton } from '@chakra-ui/react';
import {Match} from "../../../entities/Match";
import {useUsers} from "../../../hooks/useUsers";
import {useTeams} from "../../../hooks/useTeams";
import {Team} from "../../../entities/Team";
import {User} from "../../../entities/User";
import dayjs from 'dayjs';
import { CalendarIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { BsClockFill, BsFillHouseDoorFill, BsBookmarks } from 'react-icons/bs';
import {Constants} from "../../../shared/Constants";
import {refereeItem} from "../referees/RefereeListItem";
import {observerItem} from "../observers/ObserverListItem";
import {AdminMatchDeleteModal} from "./AdminMatchDeleteModal";
import {AdminMatchEditModal} from "./AdminMatchEditModal";
import { MdPeople } from 'react-icons/md';

export interface Props {
  match: Match;
}

export const AdminMatchListItem = (props: Props) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { refereesQuery, observersQuery } = useUsers();
  const { query: teamsQuery } = useTeams();

  return (
    <>
      <AdminMatchEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} match={props.match} />
      <AdminMatchDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} match={props.match} />
      <Flex
        p={5}
        borderRadius={10}
        alignItems={'center'}
        backgroundColor={'gray.50'}
        cursor={'pointer'}
      >
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
                size={'sm'}
              />
              <Text fontSize={'md'}>{homeTeam.name}</Text>
              <BsFillHouseDoorFill />
            </HStack>
            <HStack>
              <Avatar
                name={awayTeam.name}
                size={'sm'}
              />
              <Text fontSize={'md'}>{awayTeam.name}</Text>
            </HStack>
          </VStack>

          <Center height='75px' w={'10%'}>
            <Divider orientation='vertical' />
          </Center>

          <VStack align='left' ml={5} w={'40%'}>
            <HStack>
              <CalendarIcon />
              <Text fontSize={'md'}>{matchDate}</Text>
            </HStack>
            <HStack>
              <BsClockFill />
              <Text fontSize={'md'}>{matchTime}</Text>
            </HStack>
          </VStack>
        </HStack>

        <VStack align='left'>
          <HStack>
            <MdPeople />
            <Text fontSize={'md'}><b>Assignments</b></Text>
          </HStack>
            {refereeItem(referee, 'xs', 'sm', 'xs', true)}
            {observerItem(observer, 'xs', 'sm', 'xs', true)}
        </VStack>

        <VStack align='left'>
          <HStack>
            <BsBookmarks />
            <Text fontSize={'md'}><b>Grade</b></Text>
          </HStack>
        </VStack>
      </VStack>
    </>
  )
}