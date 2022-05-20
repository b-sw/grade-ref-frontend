import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';
import {matchItem} from "./MatchListItem";
import {Match} from "../../../entities/Match";
import {useMatches} from "../../../hooks/useMatches";
import {useTeams} from "../../../hooks/useTeams";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  match: Match;
}

export const MatchDeleteModal = (props: Props) => {
  const { deleteMutation } = useMatches();
  const { leagueUsersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { leagueUsersQuery: observersQuery } = useLeagueUsers(Role.Observer);
  const { query: teamsQuery } = useTeams();

  const deleteMatch = () => {
    deleteMutation.mutate(props.match.id);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete match</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Are you sure you want to delete the following match?
            </Text>
            {matchItem(props.match, teamsQuery, refereesQuery, observersQuery)}
            <Text fontWeight='bold' mt='1rem'>
              You can't undo this action afterwards.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={deleteMatch} isLoading={deleteMutation.isLoading} ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}