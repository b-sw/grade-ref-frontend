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
  Flex,
} from '@chakra-ui/react';
import {matchItem} from "./MatchListItem";
import {Match} from "entities/Match";
import {useLeagueMatches} from "hooks/useLeagueMatches";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {Path} from "utils/Path";
import {uuid} from "utils/uuid";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import {useEffect} from "react";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  match: Match;
}

export const MatchDeleteModal = (props: Props) => {
  const { deleteMutation } = useLeagueMatches();
  const { query: teamsQuery } = useLeagueTeams();

  const navigate: NavigateFunction = useNavigate();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  const deleteMatch = () => {
    deleteMutation.mutate(props.match.id);
  }

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      props.onClose();
      navigate(`${Path.ADMIN_DASHBOARD}/${leagueId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteMutation.isSuccess]);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size={'3xl'} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete match</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Are you sure you want to delete the following match?
            </Text>
            <Flex
              p={5}
              borderRadius={10}
              alignItems={'center'}
              backgroundColor={'gray.50'}
            >
              {matchItem(props.match, teamsQuery.data!, navigate, leagueId!, true)}
            </Flex>
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