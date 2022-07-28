import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useFile } from 'hooks/useFile';
import { useSetState } from 'hooks/useSetState';
import { MatchListItem } from 'components/dashboard/matches/MatchListItem';
import { useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { useLeagueUsers } from 'hooks/useLeagueUsers';
import { Role } from 'utils/Role';
import { matchFilter } from 'components/utils/filters';
import { uuid } from 'utils/uuid';
import { User } from 'entities/User';
import { Team } from 'entities/Team';
import { NoRecords } from 'components/utils/NoRecords';
import { MatchEnriched } from 'entities/MatchEnriched';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { getMatchInfoEnriched } from 'entities/utils/matchStatus';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  file: any;
}

interface State {
  matches: MatchInfoEnriched[];
  filter: string;
}

export const MatchesUploadConfirmModal = (props: Props) => {
  const { query: uploadedMatchesQuery, postMutation } = useFile();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  const referees: { [id: uuid]: User } = {};
  const observers: { [id: uuid]: User } = {};
  const teams: { [id: uuid]: Team } = {};

  refereesQuery.data!.forEach((referee) => (referees[referee.id] = referee));
  observersQuery.data!.forEach((observer) => (observers[observer.id] = observer));
  teamsQuery.data!.forEach((team) => (teams[team.id] = team));

  const [state, setState] = useSetState({
    matches: [],
    filter: '',
  } as State);

  const uploadFile = () => {
    const formData: FormData = new FormData();
    formData.append('matches', props.file);
    postMutation.mutate(formData);
  };

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
  }, [postMutation.isSuccess]);

  useEffect(() => {
    const filteredMatches: MatchEnriched[] = matchFilter(
      uploadedMatchesQuery.data!,
      teams,
      referees,
      observers,
      state.filter,
    );
    const filteredMatchesInfos = filteredMatches.map((match) =>
      getMatchInfoEnriched(match, teams, referees, observers),
    );
    setState({ matches: filteredMatchesInfos });
  }, [state.filter, uploadedMatchesQuery.data!]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size={'4xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>The following matches will be created: {uploadedMatchesQuery.data!.length}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <InputGroup>
            <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
            <Input mb={2} placeholder={'Search match'} onChange={(event) => setState({ filter: event.target.value })} />
          </InputGroup>

          <Flex direction={'column'} gap={2} overflowY={'scroll'} h={'70vh'}>
            {state.matches.length
              ? state.matches.map((match) => <MatchListItem key={match.id} readOnly={true} match={match} />)
              : NoRecords()}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={'3'}
            onClick={uploadFile}
            disabled={postMutation.isLoading}
            isLoading={postMutation.isLoading}
          >
            Confirm
          </Button>
          <Button colorScheme="red" onClick={props.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
