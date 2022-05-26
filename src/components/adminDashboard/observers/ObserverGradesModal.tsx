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
  observer: User;
  isOpen: boolean;
  onClose: () => void;
}

interface State {
  referees: { [id: uuid]: User };
}

export const ObserverGradesModal = (props: Props) => {
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const { query: matchesQuery } = useUserMatches({ userId: props.observer.id, leagueId: leagueId!, disableAutoRefetch: true });
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee, { disableAutoRefetch: true, leagueId: leagueId! });

  const [state, setState] = useSetState({ referees: {} } as State);

  useEffect(() => {
    if (refereesQuery.isSuccess) {
      let mappedReferees: { [id: uuid]: User } = {};
      refereesQuery.data!.forEach((referee) => mappedReferees[referee.id] = referee);
      setState({ referees: mappedReferees } as State);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refereesQuery.isSuccess])

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      size={'2xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.observer.firstName} {props.observer.lastName}'s grades</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {matchesQuery.data && state.referees !== {} ?
            <>
              <MatchGradeSummaryHeader matches={matchesQuery.data!} />
              <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
                {matchesQuery.data.map((match) =>
                  <MatchGradeListItem key={match.id} match={match} user={state.referees[match.refereeId]} />
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