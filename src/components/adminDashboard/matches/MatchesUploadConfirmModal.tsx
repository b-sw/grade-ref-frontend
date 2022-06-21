import { Modal, ModalHeader, ModalContent, ModalOverlay, ModalCloseButton, ModalBody, Flex, Button, ModalFooter, InputLeftElement, InputGroup, Input } from "@chakra-ui/react";
import {useFile} from "../../../hooks/useFile";
import {Match} from "../../../entities/Match";
import {useSetState} from "../../../hooks/useSetState";
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {MatchListItem} from "./MatchListItem";
import {useEffect} from "react";
import { MdSearch } from "react-icons/md";
import {useLeagueTeams} from "../../../hooks/useLeagueTeams";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";
import {matchFilter} from "../../shared/filters";
import {uuid} from "../../../shared/uuid";
import {User} from "../../../entities/User";
import {Team} from "../../../entities/Team";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  file: any;
}

interface State {
  matches: Match[];
  filter: string;
}

export const MatchesUploadConfirmModal = (props: Props) => {
  const { query: uploadedMatchesQuery, postMutation } = useFile();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  let referees: { [id: uuid]: User } = {};
  let observers: { [id: uuid]: User } = {};
  let teams: { [id: uuid]: Team } = {};

  refereesQuery.data!.forEach((referee) => referees[referee.id] = referee);
  observersQuery.data!.forEach((observer) => observers[observer.id] = observer);
  teamsQuery.data!.forEach((team) => teams[team.id] = team);

  const [state, setState] = useSetState({
    matches: [],
    filter: '',
  } as State);

  const uploadFile = () => {
    let formData: FormData = new FormData();
    formData.append('matches', props.file);
    postMutation.mutate(formData);
  }

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postMutation.isSuccess]);

  useEffect(() => {
    const filteredMatches: Match[] = matchFilter(uploadedMatchesQuery.data!, teams, referees, observers, state.filter);
    setState({ matches: filteredMatches });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filter, uploadedMatchesQuery.data!]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>The following matches will be created: {uploadedMatchesQuery.data!.length}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <InputGroup>
            <InputLeftElement
              pointerEvents={'none'}
              children={<MdSearch />}
            />
            <Input
              mb={2}
              placeholder={'Search match'}
              onChange={(event) => setState({ filter: event.target.value })}
            />
          </InputGroup>

          <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle} h={'70vh'}>
            {state.matches.map((match: Match) =>
              <MatchListItem key={match.id} readOnly={true} match={match} />)
            }
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={'3'} onClick={uploadFile} disabled={postMutation.isLoading} isLoading={postMutation.isLoading}>
            Confirm
          </Button>
          <Button colorScheme='red' onClick={props.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}