import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner
} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {User} from "../../../entities/User";
import {uuid} from "../../../shared/uuid";
import {useUserMatches} from "../../../hooks/useUserMatches";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";
import {GradesPanelBody} from "../../dashboard/grades/GradesPanel";
import {useLeagueTeams} from "../../../hooks/useLeagueTeams";
import {useGradesPanel} from "../../../hooks/useGradesPanel";

interface Props {
  observer: User;
  isOpen: boolean;
  onClose: () => void;
}

export const ObserverGradesModal = (props: Props) => {
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const { query: matchesQuery } = useUserMatches({ userId: props.observer.id, leagueId: leagueId!, disableAutoRefetch: true });
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee, { disableAutoRefetch: true, leagueId: leagueId! });
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer, { disableAutoRefetch: true, leagueId: leagueId! });
  const { query: teamsQuery } = useLeagueTeams({ disableAutoRefetch: true, leagueId: leagueId! });

  const { state, setState } = useGradesPanel({
    matches: matchesQuery.data!,
    teamsQuery: teamsQuery,
    observersQuery: observersQuery,
    refereesQuery: refereesQuery
  });

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      size={'3xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.observer.firstName} {props.observer.lastName}'s grades</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={'column'} h={'70vh'}>
            {matchesQuery.data ?
              <GradesPanelBody matches={matchesQuery.data!} state={state} setState={setState} readOnly={true} showReferee={true} />
              :
              <Spinner />
            }
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}