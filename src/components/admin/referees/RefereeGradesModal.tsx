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
import {User} from "entities/User";
import {useUserMatches} from "hooks/useUserMatches";
import {useLeagueUsers} from "hooks/useLeagueUsers";
import {Role} from "utils/Role";
import {useGradesPanel} from "hooks/useGradesPanel";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {GradesPanelBody} from "components/dashboard/grades/GradesPanel";

interface Props {
  referee: User;
  isOpen: boolean;
  onClose: () => void;
}

export const RefereeGradesModal = (props: Props) => {
  const { query: matchesQuery } = useUserMatches({ userId: props.referee.id });
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);
  const { query: teamsQuery } = useLeagueTeams();

  const { state, setState } = useGradesPanel({
    matches: matchesQuery.data!,
    teamsQuery: teamsQuery,
    observersQuery: observersQuery,
    refereesQuery: refereesQuery
  });

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size={'3xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.referee.firstName} {props.referee.lastName}'s grades</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={'column'} h={'70vh'}>
            {matchesQuery.data ?
              <GradesPanelBody matches={matchesQuery.data!} state={state} setState={setState} readOnly={true} showReferee={false} />
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