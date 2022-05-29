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
import {MatchGradeListItem} from "../../shared/MatchGradeListItem";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";
import {useEffect} from "react";
import {useSetState} from "../../../hooks/useSetState";
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {MatchGradeSummaryHeader} from "../../shared/MatchGradeSummaryHeader";

interface Props {
  referee: User;
  isOpen: boolean;
  onClose: () => void;
}

interface State {
  observers: { [id: uuid]: User };
}

export const RefereeGradesModal = (props: Props) => {
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const { query: matchesQuery } = useUserMatches({ userId: props.referee.id, leagueId: leagueId!, disableAutoRefetch: true });
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer, { disableAutoRefetch: true, leagueId: leagueId! });

  const [state, setState] = useSetState({ observers: {} } as State);

  useEffect(() => {
    if (observersQuery.isSuccess) {
      let mappedObservers: { [id: uuid]: User } = {};
      observersQuery.data!.forEach((observer) => mappedObservers[observer.id] = observer);
      setState({ observers: mappedObservers } as State);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observersQuery.isSuccess])

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      size={'2xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.referee.firstName} {props.referee.lastName}'s grades</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {matchesQuery.data && state.observers !== {} ?
            <>
              <MatchGradeSummaryHeader matches={matchesQuery.data!} />
              <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
                {matchesQuery.data.map((match) =>
                  <MatchGradeListItem key={match.id} match={match} user={state.observers[match.observerId]} />
                )}
              </Flex>
            </>
            :
            <Spinner />
          }
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