import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl, SelectControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import {User} from "../../../entities/User";
import {Match, matchValidationSchema} from "../../../entities/Match";
import {uuid} from "../../../shared/uuid";
import {useLeagueMatches} from "../../../hooks/useLeagueMatches";
import {useLeagueTeams} from "../../../hooks/useLeagueTeams";
import {Constants, FORMIK_DATETIME_FORMAT} from "../../../shared/Constants";
import dayjs from 'dayjs';
import {Team} from "../../../entities/Team";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {Role} from "../../../shared/Role";
import {MatchDeleteModal} from "./MatchDeleteModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  match: Match;
}

interface FormikValues {
  date: string;
  homeTeamId: uuid;
  awayTeamId: uuid;
  refereeId: uuid;
  observerId: uuid;
}

export const MatchEditModal = (props: Props) => {
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  const { updateMutation } = useLeagueMatches();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  useEffect(() => {
    if (updateMutation.isSuccess) {
      props.onClose();
      updateMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  const initialValues: FormikValues = {
    date: dayjs(props.match.matchDate).format(FORMIK_DATETIME_FORMAT),
    homeTeamId: props.match.homeTeamId,
    awayTeamId: props.match.awayTeamId,
    refereeId: props.match.refereeId,
    observerId: props.match.observerId,
  };

  const editMatch = (values: FormikValues) => {
    const matchDate: Date = dayjs(values.date, Constants.DATETIME_FORMAT).toDate();
    updateMutation.mutate({
      id: props.match.id,
      matchDate: matchDate,
      stadium: 'some stadium',
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId,
      refereeId: values.refereeId,
      observerId: values.observerId,
    } as Match);
  };

  return (
    <>
      <MatchDeleteModal isOpen={isDeleteModalOpen} onClose={() => { onDeleteModalClose(); props.onClose() }} match={props.match} />

      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit match</ModalHeader>
          <ModalCloseButton />

          <Formik initialValues={initialValues} onSubmit={editMatch} validationSchema={matchValidationSchema}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <ModalBody>
                  <InputControl name='date' label='Date' inputProps={{ type: 'datetime-local' }} />

                  <SelectControl
                    name='homeTeamId'
                    label='Home team'
                    mt={3}
                  >
                    {teamsQuery.data &&
                      (teamsQuery.data as Team[]).map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </SelectControl>

                  <SelectControl
                    name='awayTeamId'
                    label='Away team'
                    mt={3}
                  >
                    {teamsQuery.data &&
                      (teamsQuery.data as Team[]).map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </SelectControl>

                  <SelectControl
                    name='refereeId'
                    label='Referee'
                    mt={3}
                  >
                    {refereesQuery.data &&
                      (refereesQuery.data as User[]).map((referee) => (
                        <option key={referee.id} value={referee.id}>
                          {referee.firstName} {referee.lastName}
                        </option>
                      ))}
                  </SelectControl>

                  <SelectControl
                    name='observerId'
                    label='Observer'
                    mt={3}
                  >
                    {observersQuery.data &&
                      (observersQuery.data as User[]).map((observer) => (
                        <option key={observer.id} value={observer.id}>
                          {observer.firstName} {observer.lastName}
                        </option>
                      ))}
                  </SelectControl>
                </ModalBody>

                <ModalFooter>
                  <Button type='submit' colorScheme='blue' mr={'3'} isLoading={updateMutation.isLoading}>
                    Save
                  </Button>
                  <Button colorScheme='red' mr={'3'} onClick={onDeleteModalOpen}>
                    Delete
                  </Button>
                  <Button onClick={() => props.onClose()}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
