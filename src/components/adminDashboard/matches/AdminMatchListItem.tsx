import { Flex, Spacer, VStack, Text, Avatar, HStack, Divider, Center } from '@chakra-ui/react';
import {Match} from "../../../entities/Match";
import {useUsers} from "../../../hooks/useUsers";
import {useTeams} from "../../../hooks/useTeams";
import {Team} from "../../../entities/Team";
import {User} from "../../../entities/User";

export interface Props {
  match: Match;
}

export const AdminMatchListItem = (props: Props) => {
  // const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  // const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { refereesQuery, observersQuery } = useUsers();
  const { query: teamsQuery } = useTeams();

  return (
    <>
      {/*<AdminMatchEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} match={props.match} />*/}
      {/*<AdminMatchDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} match={props.match} />*/}
      <Flex py={2} borderRadius={5} alignItems={'center'}>
        {matchItem(props.match, teamsQuery, refereesQuery, observersQuery)}
        <Spacer />
        {/*<IconButton onClick={onEditModalOpen} variant={'ghost'} aria-label='Edit match' icon={<EditIcon />} />*/}
        {/*<IconButton onClick={onDeleteModalOpen} variant={'ghost'} aria-label='Delete match' icon={<DeleteIcon />} />*/}
      </Flex>
    </>
  );
}

export const matchItem = (match: Match, teamsQuery: any, refereesQuery: any, observersQuery: any) => {

  const homeTeam: Team = teamsQuery.data!.find((team: Team) => team.id === match.homeTeamId)!;
  const awayTeam: Team = teamsQuery.data!.find((team: Team) => team.id === match.awayTeamId)!;
  const referee: User = refereesQuery.data!.find((referee: User) => referee.id === match.refereeId)!;
  const observer: User = observersQuery.data!.find((observer: User) => observer.id === match.observerId)!;

  return (
    <>
      <VStack align='left' mr={5}>
          <HStack>
            <Avatar
              name={homeTeam.name}
              size={'sm'}
            />
            <Text>{homeTeam.name}</Text>
          </HStack>
          <HStack>
            <Avatar
              name={awayTeam.name}
              size={'sm'}
            />
            <Text>{awayTeam.name}</Text>
          </HStack>
      </VStack>
      <Center height='50px'>
        <Divider orientation='vertical' />
      </Center>

      <VStack align='left' ml={5}>
        {/*<Text>Date: {match.date}</Text>*/}
        <Text>Referee: {referee.firstName} {referee.lastName}</Text>
        <Text>Observer: {observer.firstName} {observer.lastName}</Text>
      </VStack>
    </>
  )
}