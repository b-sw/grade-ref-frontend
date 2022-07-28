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
  Spinner,
} from '@chakra-ui/react';
import { User } from 'entities/User';
import { useUserMatches } from 'hooks/useUserMatches';
import { GradesPanelBody } from 'components/dashboard/grades/GradesPanel';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { useGradesPanel } from 'hooks/useGradesPanel';

interface Props {
  observer: User;
  isOpen: boolean;
  onClose: () => void;
}

export const ObserverGradesModal = (props: Props) => {
  const { query: matchesQuery } = useUserMatches({ userId: props.observer.id });
  const { query: teamsQuery } = useLeagueTeams();

  const { state, setState } = useGradesPanel({
    matches: matchesQuery.data!,
    teamsQuery: teamsQuery,
  });

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size={'3xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {props.observer.firstName} {props.observer.lastName}'s grades
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={'column'} h={'70vh'}>
            {matchesQuery.data ? (
              <GradesPanelBody
                matches={matchesQuery.data!}
                state={state}
                setState={setState}
                readOnly={true}
                showReferee={true}
              />
            ) : (
              <Spinner />
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
