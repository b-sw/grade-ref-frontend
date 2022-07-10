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
  Code,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from '@chakra-ui/react';
import {useLeagues} from "hooks/useLeagues";
import {useLeagueMatches} from "hooks/useLeagueMatches";
import {useSetState} from "hooks/useSetState";
import {League} from "entities/League";
import {uuid} from "utils/uuid";
import {leagueItem} from "../../adminExplorer/AdminLeagueCard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  leagueId: uuid;
}

interface State {
  text: string;
}

export const LeagueDeleteModal = (props: Props) => {
  const { deleteMutation } = useLeagues();
  const { query: leaguesQuery } = useLeagues();
  const { query: matchesQuery } = useLeagueMatches();
  const [state, setState] = useSetState({
    text: '',
  } as State);
  const safetyText: string = 'greedy marlin';

  const leagueIdx: number = leaguesQuery.data!.findIndex((l: League) => l.id === props.leagueId)!;
  const league: League = leaguesQuery.data![leagueIdx];

  const deleteLeague = () => {
    if (state.text !== safetyText) {
      return;
    }
    deleteMutation.mutate(props.leagueId);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>League deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {matchesQuery.data && matchesQuery.data.length > 0
              ? 'If you remove this league all its matches and their grades will also be purged.'
              : 'Are you sure you want to delete this league?'}
          </Text>
          <Flex
            my={2}
            p={5}
            borderRadius={10}
            alignItems={'center'}
            backgroundColor={'gray.50'}
          >
            {leagueItem(league)}
          </Flex>
          <Text color={'red'}>
            This operation cannot be reversed.
          </Text>
          <Text mt={5}>Confirm by rewriting this text:</Text>
          <Code my={2}>{safetyText}</Code>
          <FormControl>
            <FormLabel>Text</FormLabel>
            <Input
              value={state.text}
              onChange={(e) => setState({ text: e.target.value })}
              onPaste={(e) => e.preventDefault()}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='red' mr={'3'} onClick={() => deleteLeague()} isLoading={deleteMutation.isLoading}>
            Delete
          </Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
